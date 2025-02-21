"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, Clock, Pause, Play, SkipBack, SkipForward, Wifi, Volume2, Battery } from "lucide-react"
import { Button } from "@comp/components/ui/button"
import { cn } from "@comp/lib/utils"

const quotes = [
  "Code is like humor. When you have to explain it, it's bad. – Cory House",
  "Programming isn't about what you know; it's about what you can figure out. – Chris Pine",
  "The best way to predict the future is to invent it. – Alan Kay",
  "First, solve the problem. Then, write the code. – John Johnson",
  "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
  "Your most unhappy customers are your greatest source of learning. – Bill Gates",
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it. – Patrick McKenzie",
  "Simplicity is the soul of efficiency. – Austin Freeman",
  "If debugging is the process of removing software bugs, then programming must be the process of putting them in. – Edsger Dijkstra",
]

export default function AnimatedTerminalQuotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isErasing, setIsErasing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Time update effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const nextQuote = useCallback(() => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
    setIsTyping(true)
    setIsErasing(false)
    setDisplayedText("")
  }, [])

  const previousQuote = useCallback(() => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length)
    setIsTyping(true)
    setIsErasing(false)
    setDisplayedText("")
  }, [])

  useEffect(() => {
    if (isPaused) return

    let currentIndex = 0
    let timer: NodeJS.Timeout

    const typeText = () => {
      if (currentIndex < quotes[currentQuoteIndex].length) {
        setDisplayedText(quotes[currentQuoteIndex].substring(0, currentIndex + 1))
        currentIndex++
        timer = setTimeout(typeText, 50)
      } else {
        setIsTyping(false)
        timer = setTimeout(() => {
          setIsErasing(true)
          currentIndex = quotes[currentQuoteIndex].length
        }, 2000)
      }
    }

    const eraseText = () => {
      if (currentIndex > 0) {
        setDisplayedText(quotes[currentQuoteIndex].substring(0, currentIndex - 1))
        currentIndex--
        timer = setTimeout(eraseText, 30)
      } else {
        setIsErasing(false)
        setIsTyping(true)
        nextQuote()
      }
    }

    if (isTyping && !isErasing) {
      typeText()
    } else if (isErasing) {
      eraseText()
    }

    return () => clearTimeout(timer)
  }, [currentQuoteIndex, isTyping, isErasing, isPaused, nextQuote])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          setIsPaused((prev) => !prev)
          break
        case "ArrowLeft":
          previousQuote()
          break
        case "ArrowRight":
          nextQuote()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextQuote, previousQuote])

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-gray-900 to-black p-4 flex flex-col">
      {/* Desktop Bar */}
      <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-b border-white/10 px-4 py-2 flex justify-between items-center text-white/80">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">DevQuotes</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="mt-16 flex-1 flex flex-col">
        <div className="max-w-7xl w-full mx-auto bg-blue-950/20 rounded-lg overflow-hidden border border-blue-500/20 shadow-2xl backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="px-4 py-3 border-b border-blue-500/20 bg-blue-950/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/90 shadow-lg shadow-red-500/20"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/90 shadow-lg shadow-yellow-500/20"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/90 shadow-lg shadow-green-500/20"></div>
            </div>
            <span className="text-blue-400 text-sm font-mono">~/dev/motivation.sh</span>
            <div className="w-16"></div>
          </div>

          {/* Terminal Content */}
          <div className="p-8 space-y-8 min-h-[70vh] bg-gradient-to-b from-blue-950/40 to-gray-950/40">
            {/* Command History */}
            <div className="font-mono text-blue-400/80 text-sm space-y-1">
              <div>Last login: {currentTime.toLocaleString()} on ttys000</div>
              <div>
                <span className="text-green-500">➜</span> <span className="text-blue-400">~/dev</span>{" "}
                <span className="text-yellow-500">git:</span>
                <span className="text-purple-500">(main)</span> <span className="text-blue-300">$</span>{" "}
                <span className="text-blue-200">cat motivation.txt</span>
              </div>
            </div>

            {/* Quote Display */}
            <div className="font-mono text-blue-100 text-xl leading-relaxed pl-6 border-l-2 border-blue-500/30">
              {displayedText}
              <span
                className={cn("inline-block w-2 h-6 ml-1 bg-blue-400", isPaused ? "opacity-50" : "animate-pulse")}
                aria-hidden="true"
              />
            </div>

            {/* Status Bar */}
            <div className="font-mono text-blue-400/80 text-sm flex items-center justify-between">
              <div>
                <span className="text-blue-600">#</span> Quote {currentQuoteIndex + 1}/{quotes.length}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-blue-600">|</span>
                <span>Press Space to {isPaused ? "resume" : "pause"}</span>
                <span className="text-blue-600">|</span>
                <span>{isTyping ? "Typing..." : isErasing ? "Erasing..." : "Waiting..."}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 items-center mt-8">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={previousQuote}
              className="bg-blue-950/30 border-blue-500/30 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300"
            >
              <SkipBack className="h-4 w-4" />
              <span className="sr-only">Previous quote</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
              className="bg-blue-950/30 border-blue-500/30 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300"
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              <span className="sr-only">{isPaused ? "Resume" : "Pause"} animation</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextQuote}
              className="bg-blue-950/30 border-blue-500/30 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300"
            >
              <SkipForward className="h-4 w-4" />
              <span className="sr-only">Next quote</span>
            </Button>
          </div>

          {/* Progress Indicators */}
          <div
            className="flex flex-wrap justify-center gap-2 max-w-2xl px-4"
            role="tablist"
            aria-label="Quote progress"
          >
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuoteIndex(index)
                  setIsTyping(true)
                  setIsErasing(false)
                  setDisplayedText("")
                }}
                className={cn(
                  "h-1.5 w-8 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                  index === currentQuoteIndex
                    ? "bg-blue-400 scale-110 shadow-lg shadow-blue-500/50"
                    : "bg-blue-950/50 hover:bg-blue-900/50",
                )}
                role="tab"
                aria-selected={index === currentQuoteIndex}
                aria-label={`Quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

