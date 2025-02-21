"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, Clock, Pause, Play, SkipBack, SkipForward, Wifi, Volume2, Battery, Share2, Heart, BookMarked, Apple } from "lucide-react"
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
  const [currentTime, setCurrentTime] = useState("")
  const [isFavorited, setIsFavorited] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const formatTime = () => {
      return new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    }

    setCurrentTime(formatTime())
    const timer = setInterval(() => setCurrentTime(formatTime()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleQuoteChange = useCallback((newIndex: number) => {
    setCurrentQuoteIndex(newIndex)
    setIsTyping(true)
    setIsErasing(false)
    setDisplayedText("")
    setIsFavorited(false)
    setIsBookmarked(false)
  }, [])

  const nextQuote = useCallback(() => {
    handleQuoteChange((currentQuoteIndex + 1) % quotes.length)
  }, [currentQuoteIndex, handleQuoteChange])

  const previousQuote = useCallback(() => {
    handleQuoteChange((currentQuoteIndex - 1 + quotes.length) % quotes.length)
  }, [currentQuoteIndex, handleQuoteChange])

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
        }, 3000)
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

    if (isTyping && !isErasing) typeText()
    else if (isErasing) eraseText()

    return () => clearTimeout(timer)
  }, [currentQuoteIndex, isTyping, isErasing, isPaused, nextQuote])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.tagName === 'BUTTON') return;
      
      switch (e.key) {
        case " ":
          e.preventDefault();
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
    <div className="min-h-screen w-full">
      {/* Desktop Bar */}
      <div className="top-0 left-0 right-0 bg-black/60 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center text-white/90">
        <div className="flex items-center gap-2 sm:gap-3">
          <Apple className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            DevQuotes
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm">
          <div className="hidden sm:flex items-center gap-3">
            <Wifi className="w-4 h-4 text-green-400" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4 text-green-400" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3 bg-blue-950/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="font-mono text-xs sm:text-sm">{currentTime || "Loading..."}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-2 sm:p-4 md:p-8">
        <div className="max-w-7xl w-full mx-auto bg-blue-950/20 rounded-lg sm:rounded-xl overflow-hidden border border-blue-500/20 shadow-xl sm:shadow-2xl backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="px-3 sm:px-6 py-2 sm:py-4 border-b border-blue-500/20 bg-blue-950/40 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500/90"></div>
                <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500/90"></div>
                <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500/90"></div>
              </div>
              <div className="w-px h-3 sm:h-4 bg-blue-500/20"></div>
              <span className="text-blue-400 text-xs sm:text-sm font-mono hidden sm:block">~/dev/motivation.sh</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="text-blue-400 hover:text-blue-300 h-8 w-8 sm:h-9 sm:w-9"
              >
                <BookMarked className={cn("h-3 w-3 sm:h-4 sm:w-4", isBookmarked && "fill-current")} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className="text-blue-400 hover:text-blue-300 h-8 w-8 sm:h-9 sm:w-9"
              >
                <Heart className={cn("h-3 w-3 sm:h-4 sm:w-4", isFavorited && "fill-current text-red-400")} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 h-8 w-8 sm:h-9 sm:w-9"
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 sm:p-6 md:p-10 space-y-4 sm:space-y-8 min-h-[40vh] sm:min-h-[60vh] bg-gradient-to-b from-blue-950/40 to-gray-950/40">
            {/* Command History */}
            <div className="font-mono text-blue-400/80 text-xs sm:text-sm space-y-2">
              <div className="opacity-70">
                {currentTime ? (
                  <>Last login: {currentTime} on This Device</>
                ) : (
                  <span className="opacity-0">Loading...</span>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-green-500">➜</span>
                <span className="text-blue-400">~/dev</span>
                <span className="text-yellow-500">git:</span>
                <span className="text-purple-500">(main)</span>
                <span className="text-blue-300">$</span>
                <span className="text-blue-200">cat motivation.txt</span>
              </div>
            </div>

            {/* Quote Display */}
            <div className="relative font-mono text-blue-100 text-lg sm:text-xl md:text-2xl leading-relaxed pl-4 sm:pl-8 border-l-2 border-blue-500/30">
              <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-4 sm:w-6 h-4 sm:h-6 bg-blue-500/10 rounded-full flex items-center justify-center">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full"></div>
              </div>
              {displayedText}
              <span
                className={cn(
                  "inline-block w-1.5 sm:w-2 h-6 sm:h-8 ml-1 bg-blue-400",
                  isPaused ? "opacity-50" : "animate-pulse"
                )}
                aria-hidden="true"
              />
            </div>

            {/* Status Bar */}
            <div className="font-mono text-blue-400/80 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between bg-blue-950/20 rounded-lg px-3 sm:px-4 py-2 gap-2 sm:gap-0">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">#</span>
                <span className="bg-blue-950/40 px-2 py-1 rounded">
                  Quote {currentQuoteIndex + 1}/{quotes.length}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-xs">
                <span className="text-blue-600 hidden sm:inline">|</span>
                <span className="opacity-75">Space to {isPaused ? "resume" : "pause"}</span>
                <span className="text-blue-600">|</span>
                <span className="bg-blue-950/40 px-2 py-1 rounded">
                  {isTyping ? "Typing..." : isErasing ? "Erasing..." : "Waiting..."}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 sm:gap-8 items-center mt-6 sm:mt-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={previousQuote}
              className="bg-blue-950/30 border-blue-500/30 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300 w-10 h-10 sm:w-12 sm:h-12"
            >
              <SkipBack className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
              className="bg-blue-950/30 border-blue-500/30 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300 w-12 h-12 sm:w-16 sm:h-16"
            >
              {isPaused ? <Play className="h-5 w-5 sm:h-6 sm:w-6" /> : <Pause className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextQuote}
              className="bg-blue-950/30 border-blue-500/30 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300 w-10 h-10 sm:w-12 sm:h-12"
            >
              <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Progress Indicators */}
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl px-4"
            role="tablist"
            aria-label="Quote progress"
          >
             {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuoteChange(index)}
                className={cn(
                  "h-1 sm:h-1.5 w-8 sm:w-12 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                  index === currentQuoteIndex
                    ? "bg-blue-400 scale-110 shadow-lg shadow-blue-500/50"
                    : "bg-blue-950/50 hover:bg-blue-900/50"
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