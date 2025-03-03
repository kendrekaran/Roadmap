"use client"

import Link from "next/link"
import Image from "next/image"
import { signIn, signOut } from "@comp/auth"
import { Button } from "@comp/components/ui/button"
import { Camera, Menu, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@comp/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { ThemeToggle } from "@comp/components/theme-toggle"

interface User {
  image?: string | null
  name?: string | null
  email?: string | null
}

interface ProfileImageProps {
  user: User
  size?: "desktop" | "mobile"
}

type FormAction = () => Promise<void>

export default function Navbar() {
  const { data: session } = useSession()
  const user = session?.user as User | undefined

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact Us" },
  ]

  const ProfileImage = ({ user, size = "desktop" }: ProfileImageProps) => {
    const imageSize = size === "desktop" ? "w-12 h-12" : "w-10 h-10"

    if (!user?.image) {
      return (
        <div
          className={`${imageSize} rounded-xl bg-gradient-to-r from-blue-600/80 to-sky-600/80 dark:from-blue-600/80 dark:to-sky-600/80 light:from-blue-500/90 light:to-sky-500/90 flex items-center justify-center`}
        >
          <Camera className={size === "desktop" ? "h-6 w-6" : "h-5 w-5"} />
        </div>
      )
    }

    return (
      <div className="relative w-full h-full">
        <Image
          src={user.image || "/placeholder.svg"}
          alt={`${user.name || "User"}'s profile`}
          width={size === "desktop" ? 48 : 40}
          height={size === "desktop" ? 48 : 40}
          className="object-cover rounded-xl"
          priority
        />
      </div>
    )
  }

  const handleSignOut: FormAction = async () => {
    await signOut()
    redirect("/")
  }

  const handleSignIn: FormAction = async () => {
    await signIn("google", { redirectTo: "/" })
    redirect("/")
  }

  return (
    <div className="top-0 left-0 right-0 z-50 px-4 py-4 md:py-6">
      <div className="mx-auto max-w-5xl">
        <nav className="relative rounded-2xl bg-white/95 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-sky-500/5 dark:from-blue-500/10 dark:to-sky-500/10 opacity-50" />
          <div className="flex justify-between items-center h-16 md:h-20 px-4 md:px-8">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 relative group">
                <h1 className="bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-600 dark:to-blue-800 light:from-blue-500 light:to-blue-700 text-transparent bg-clip-text text-2xl sm:text-3xl font-bold ">
                  <span className="bg-gradient-to-b from-gray-800 to-gray-900 dark:from-white dark:to-gray-600 light:from-gray-800 light:to-gray-900 text-transparent bg-clip-text">
                    Skill
                  </span>
                  Path.
                </h1>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-baseline space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 group"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle />

              {user ? (
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative w-12 h-12 p-0 rounded-xl overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <ProfileImage user={user} size="desktop" />
                        <div className="absolute inset-0 ring-2 ring-gray-200 dark:ring-white/20 group-hover:ring-gray-300 dark:group-hover:ring-white/40 rounded-xl transition-all duration-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      sideOffset={8}
                      className="w-64 bg-white dark:bg-black/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-xl"
                    >
                      <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10 text-gray-700 dark:text-white/90 px-4 py-3 group">
                        <span className="relative flex items-center">
                          Profile
                          <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10 text-gray-700 dark:text-white/90 px-4 py-3 group">
                        <span className="relative flex items-center">
                          Settings
                          <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10 px-4 py-3">
                        <form action={handleSignOut}>
                          <button className="w-full text-left text-gray-700 dark:text-white/90 group">
                            <span className="relative flex items-center">
                              Sign Out
                              <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                            </span>
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <form action={handleSignIn}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="relative bg-white/5 dark:bg-white/5 light:bg-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-white border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 group px-6"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative flex items-center">
                      <img
                        src="/google.svg"
                        className="h-5 w-5 mr-3 opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                        alt=""
                      />
                      Sign In
                    </span>
                  </Button>
                </form>
              )}
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl"
                  >
                    <Menu className="h-8 w-8" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  alignOffset={-8}
                  className="w-[calc(100vw-32px)] mt-2 mr-[-16px] bg-white dark:bg-black/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-xl"
                >
                  {user && (
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10">
                      <div className="flex items-center space-x-3">
                        <ProfileImage user={user} size="mobile" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700 dark:text-white">{user.name}</div>
                          <div className="text-xs text-gray-500 dark:text-white/60">{user.email}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {navItems.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      asChild
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10"
                    >
                      <Link href={item.href} className="text-gray-700 dark:text-white/90 group">
                        <span className="relative flex items-center">
                          {item.label}
                          <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10">
                    {user ? (
                      <form action={handleSignOut} className="w-full">
                        <button className="w-full text-left text-gray-700 dark:text-white/90 group">
                          <span className="relative flex items-center">
                            Sign Out
                            <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                          </span>
                        </button>
                      </form>
                    ) : (
                      <form action={handleSignIn} className="w-full">
                        <button className="w-full text-left text-gray-700 dark:text-white/90 group">
                          <span className="relative flex items-center">
                            <img
                              src="/google.svg"
                              className="h-5 w-5 mr-3 opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                              alt=""
                            />
                            Sign In with Google
                            <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                          </span>
                        </button>
                      </form>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

