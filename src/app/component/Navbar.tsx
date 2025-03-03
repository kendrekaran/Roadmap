import Link from "next/link"
import Image from "next/image"
import { auth, signIn, signOut } from "@comp/auth"
import { Button } from "@comp/components/ui/button"
import { Camera, Menu, ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@comp/components/ui/dropdown-menu"
import { Session } from "next-auth"
import { redirect } from "next/navigation"
import { routes } from "../lib/routes"
interface User {
  image?: string | null
  name?: string | null
  email?: string | null
}

interface ProfileImageProps {
  user: User
  size?: "desktop" | "mobile"
}

interface FormAction {
  (): Promise<void>
}

export default async function Navbar() {
  const session = await auth() as Session | null
  const user = session?.user as User | undefined

  const ProfileImage = ({ user, size = "desktop" }: ProfileImageProps) => {
    const imageSize = size === "desktop" ? "w-12 h-12" : "w-10 h-10"
    
    if (!user?.image) {
      return (
        <div className={`${imageSize} rounded-xl bg-gradient-to-r from-blue-600/80 to-sky-600/80 flex items-center justify-center`}>
          <Camera className={size === "desktop" ? "h-6 w-6" : "h-5 w-5"} />
        </div>
      )
    }

    return (
      <div className="relative w-full h-full">
        <Image
          src={user.image}
          alt={`${user.name || 'User'}'s profile`}
          width={size === "desktop" ? 48 : 40}
          height={size === "desktop" ? 48 : 40}
          className="object-cover rounded-xl"
          priority
        />
      </div>
    )
  }

  const handleSignOut: FormAction = async () => {
    "use server"
    await signOut()
    redirect("/")
  }

  const handleSignIn: FormAction = async () => {
    "use server"
    await signIn("google", { redirectTo: "/" })
    redirect("/")
  }

  return (
    <div className="top-0 left-0 right-0 z-50 px-4 py-4 md:py-6">
      <div className="mx-auto max-w-5xl">
        <nav className="relative rounded-2xl bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-sky-500/10 opacity-50" />
          <div className="flex justify-between items-center h-16 md:h-20 px-4 md:px-8">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 relative group">
                <h1 className="bg-gradient-to-b from-blue-600 to-blue-800 text-transparent bg-clip-text text-2xl sm:text-3xl font-bold "><span className="bg-gradient-to-b from-white to-gray-600 text-transparent bg-clip-text">Skill</span>Path.</h1>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-1">
                {routes.map((route) => (
                  <Link
                    key={route.id}
                    href={route.href}
                    className="relative text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 group"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative">{route.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative w-12 h-12 p-0 rounded-xl overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <ProfileImage user={user} size="desktop" />
                        <div className="absolute inset-0 ring-2 ring-white/20 group-hover:ring-white/40 rounded-xl transition-all duration-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={8} className="w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/20">
                      <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 text-white/90 px-4 py-3 group">
                        <span className="relative flex items-center">
                          Profile
                          <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 text-white/90 px-4 py-3 group">
                        <span className="relative flex items-center">
                          Settings
                          <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 px-4 py-3">
                        <form action={handleSignOut}>
                          <button className="w-full text-left text-white/90 group">
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
                  <Button variant="outline" size="lg" className="relative bg-white/5 rounded-xl hover:bg-white/10 text-white border-white/10 hover:border-white/20 group px-6">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative flex items-center">
                      <img src="/google.svg" className="h-5 w-5 mr-3 opacity-90 group-hover:opacity-100 transition-opacity duration-200" alt="" />
                      Sign In
                    </span>
                  </Button>
                </form>
              )}
            </div>

            <div className="block md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-10 w-10 text-white/90 hover:text-white hover:bg-white/10 rounded-xl">
                    <Menu className="h-8 w-8" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  alignOffset={-8}
                  className="w-[calc(100vw-32px)] mt-2 mr-[-16px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/20"
                >
                  {user && (
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <ProfileImage user={user} size="mobile" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-xs text-white/60">{user.email}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {routes.map((route) => (
                    <DropdownMenuItem key={route.href} asChild className="px-4 py-3 hover:bg-white/10 focus:bg-white/10">
                      <Link href={route.href} className="text-white/90 group">
                        <span className="relative flex items-center">
                          {route.label}
                          <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="px-4 py-3 hover:bg-white/10 focus:bg-white/10">
                    {user ? (
                      <form action={handleSignOut} className="w-full">
                        <button className="w-full text-left text-white/90 group">
                          <span className="relative flex items-center">
                            Sign Out
                            <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                          </span>
                        </button>
                      </form>
                    ) : (
                      <form action={handleSignIn} className="w-full">
                        <button className="w-full text-left text-white/90 group">
                          <span className="relative flex items-center">
                            <img src="/google.svg" className="h-5 w-5 mr-3 opacity-90 group-hover:opacity-100 transition-opacity duration-200" alt="" />
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