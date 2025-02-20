'use client';
import React, { useState, useEffect, useCallback, useRef, KeyboardEvent } from 'react';
import { Send, Trash2, Terminal, ChevronRight, Loader2, Copy, Check } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  displayContent?: string; 
}

function TerminalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastLogin, setLastLogin] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingSpeed = 10;

  useEffect(() => {
    const now = new Date();
    setLastLogin(now.toLocaleString());
  }, []);

  useEffect(() => {
    if (copiedIndex !== null) {
      const timer = setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedIndex]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant' && !lastMessage.displayContent) {
      let currentText = '';
      let currentIndex = 0;

      const typeText = () => {
        if (currentIndex < lastMessage.content.length) {
          currentText += lastMessage.content[currentIndex];
          setMessages(prev => prev.map((msg, i) => 
            i === prev.length - 1 
              ? { ...msg, displayContent: currentText }
              : msg
          ));
          currentIndex++;
          setTimeout(typeText, typingSpeed);
        }
      };

      typeText();
    }
  }, [messages]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const newMessages: Message[] = [...messages, { role: 'user', content: input, timestamp }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setMessages([
        ...newMessages,
        { 
          role: 'assistant', 
          content: text, 
          timestamp: new Date().toLocaleTimeString(),
          displayContent: '' // Initialize empty display content for typing effect
        }
      ]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Error: Unable to process request. Please try again.',
          timestamp: new Date().toLocaleTimeString(),
          displayContent: ''
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, messages]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen w-full font-mono p-4 text-sm">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl hide-scrollbar-track overflow-y-auto overflow-hidden border shadow-2xl border-blue-500/30 backdrop-blur-sm bg-black/20">
          {/* Terminal Header */}
          <div className="bg-gray-900/80 p-4 flex items-center justify-between border-b border-blue-500/30">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-lg hover:bg-red-400 transition-colors duration-200"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-lg hover:bg-yellow-400 transition-colors duration-200"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-lg hover:bg-green-400 transition-colors duration-200"></div>
              </div>
              <div className="flex items-center text-blue-200 space-x-2 bg-blue-500/10 px-3 py-1 rounded-md">
                <Terminal className="w-4 h-4" />
                <span className="text-xs font-semibold">AI Terminal</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-400">Session Active</span>
              <button
                onClick={clearChat}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200 bg-gray-800/50 p-1.5 rounded-md hover:bg-gray-800/80"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="bg-gray-900/70 p-6 h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
            <div className="text-blue-400/80 mb-6 font-light flex items-center space-x-2">
              <span className="text-green-400">➜</span>
              <span className="text-blue-300">Last login:</span>
              <span className="text-gray-400">{lastLogin}</span>
            </div>

            {/* Messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className="mb-4 transition-all duration-300 hover:bg-blue-500/5 p-3 rounded-lg border border-transparent hover:border-blue-500/20"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{message.timestamp}</span>
                    <span>•</span>
                    <span>{message.role === 'user' ? 'User Input' : 'AI Response'}</span>
                  </div>
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(message.content, index)}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                      title="Copy response"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                {message.role === 'user' ? (
                  <div className="pb-2 text-start flex items-start space-x-2 text-blue-100">
                    <span className="text-green-400 mt-1">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                    <span className="text-emerald-400 flex-1">{message.content}</span>
                  </div>
                ) : (
                  <div className="pb-2 text-start flex items-start space-x-2 text-blue-100">
                    <span className="text-blue-400 mt-1">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                    <div className="text-gray-200 flex-1 leading-relaxed prose prose-invert max-w-none">
                      <ReactMarkdown>{message.displayContent || ''}</ReactMarkdown>
                      {message.displayContent !== message.content && (
                        <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-1"></span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-blue-400 pl-2 pt-2 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">Processing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-gray-900/80 p-4 flex items-center border-t border-blue-500/30">
            <div className="flex items-center space-x-2 text-lg mr-3">
              <span className="text-green-400">$</span>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-gray-800/50 border border-blue-500/30 text-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-400/20 placeholder-blue-300/30 rounded-md px-4 py-2 outline-none transition-all duration-200"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={isTyping || !input.trim()}
              className="ml-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 rounded-md p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/10 active:scale-95"
            >
              {isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalChat;