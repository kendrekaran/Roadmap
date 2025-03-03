"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@comp/app/component/theme-provider"
import { Button } from "@comp/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@comp/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 text-white/90 dark:text-white/90 hover:text-black light:text-black hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 rounded-xl"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-black/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10 text-gray-700 dark:text-white/90 cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10 text-gray-700 dark:text-white/90 cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10 text-gray-700 dark:text-white/90 cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

