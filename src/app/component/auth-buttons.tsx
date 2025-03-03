'use client'

import { signIn, signOut } from "next-auth/react"
import { Button } from "@comp/components/ui/button"
import { ChevronRight } from "lucide-react"

export function SignInButton() {
  return (
    <Button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      variant="outline"
      size="lg"
      className="relative bg-white/5 rounded-xl hover:bg-white/10 text-white border-white/10 hover:border-white/20 group px-6"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <span className="relative flex items-center">
        <img src="/google.svg" className="h-5 w-5 mr-3 opacity-90 group-hover:opacity-100 transition-opacity duration-200" alt="" />
        Sign In
      </span>
    </Button>
  )
}

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="w-full text-left text-white/90 group"
    >
      <span className="relative flex items-center">
        Sign Out
        <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
      </span>
    </button>
  )
}
