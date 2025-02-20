"use client"

import { useState, useEffect, useCallback } from "react"
import { Pause, Play, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@comp/components/ui/button"
import { cn } from "../../lib/utils"

const quotes = [
    "Code is like humor. When you have to explain it, it’s bad. – Cory House",
    "Programming isn't about what you know; it's about what you can figure out. – Chris Pine",
    "The best way to predict the future is to invent it. – Alan Kay",
    "First, solve the problem. Then, write the code. – John Johnson",
    "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
    "Your most unhappy customers are your greatest source of learning. – Bill Gates",
    "Talk is cheap. Show me the code. – Linus Torvalds",
    "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it. – Patrick McKenzie",
    "Simplicity is the soul of efficiency. – Austin Freeman",
    "If debugging is the process of removing software bugs, then programming must be the process of putting them in. – Edsger Dijkstra"
  ];
  

export default function AnimatedTerminalQuotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isErasing, setIsErasing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

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

  // Handle keyboard controls
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
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">

        <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/90 shadow-lg shadow-red-500/20"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/90 shadow-lg shadow-yellow-500/20"></div>
            <div className="h-3 w-3 rounded-full bg-green-500/90 shadow-lg shadow-green-500/20"></div>
          </div>
          <span className="text-zinc-400 text-sm font-mono">motivation.sh</span>
          <div className="w-16"></div>
        </div>


        <div className="p-6 md:p-8 space-y-6 min-h-[240px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-zinc-950">

          <div className="font-mono text-zinc-400 text-sm">
            <span className="text-emerald-500">➜</span> <span className="text-blue-500">~/quotes</span>{" "}
            <span className="text-yellow-500">git:</span>
            <span className="text-purple-500">(main)</span> <span className="text-zinc-400">$</span>{" "}
            <span className="text-zinc-300">echo &quot;motivation&quot;</span>
          </div>


          <div className="font-mono px-44 text-white text-lg md:text-xl leading-relaxed border-l-2 border-blue-500/20">
            {displayedText}
            <span
              className={cn("inline-block w-2 h-5 ml-1 bg-blue-500", isPaused ? "opacity-50" : "animate-pulse")}
              aria-hidden="true"
            />
          </div>


          <div className="font-mono text-blue-500/80 text-sm">
            <span className="text-zinc-600">#</span> {currentQuoteIndex + 1}/{quotes.length}{" "}
            <span className="text-zinc-600">|</span> Press Space to {isPaused ? "resume" : "pause"}
          </div>
        </div>
      </div>


      <div className="flex flex-col gap-4 items-center mt-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousQuote} className="text-zinc-400 hover:text-zinc-100">
            <SkipBack className="h-4 w-4" />
            <span className="sr-only">Previous quote</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="text-zinc-400 hover:text-zinc-100"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            <span className="sr-only">{isPaused ? "Resume" : "Pause"} animation</span>
          </Button>

          <Button variant="outline" size="icon" onClick={nextQuote} className="text-zinc-400 hover:text-zinc-100">
            <SkipForward className="h-4 w-4" />
            <span className="sr-only">Next quote</span>
          </Button>
        </div>


        <div className="flex  justify-center gap-2" role="tablist" aria-label="Quote progress">
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
                "h-2 w-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                index === currentQuoteIndex ? "bg-blue-500 scale-125" : "bg-zinc-600 hover:bg-zinc-500",
              )}
              role="tab"
              aria-selected={index === currentQuoteIndex}
              aria-label={`Quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

