import { auth, signIn, signOut } from "@comp/auth"
import Navbar from "./component/Navbar"
import Inputdata from "./component/Input"
import TerminalChat from "./component/Chatbot"

export default async function Home() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="min-h-screen py-24 sm:py-32 bg-gradient-to-b from-gray-50 via-blue-50/50 to-gray-50 dark:from-black dark:via-blue-950/50 dark:to-black overflow-hidden">
      <Navbar />

      <main className="container mx-auto px-4 sm:py-8 text-center relative">
        <div className="relative z-10 space-y-8 py-16">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-base bg-gradient-to-b from-gray-800 to-gray-900 dark:from-white dark:to-gray-600 text-transparent bg-clip-text max-w-4xl mx-auto leading-tight tracking-tight">
              Navigate Your&nbsp;
              <span className="bg-gradient-to-b from-blue-500 to-blue-700 dark:from-blue-500 dark:to-blue-800 text-transparent bg-clip-text">
                Career&nbsp;
                <br />
              </span>
              <span className="bg-gradient-to-b from-gray-800 to-gray-900 dark:from-white dark:to-gray-600 text-transparent bg-clip-text">
                With AI-Powered&nbsp;
                <span className="bg-gradient-to-b from-blue-500 to-blue-700 dark:from-blue-500 dark:to-blue-800 text-transparent bg-clip-text">
                  <span className="block sm:hidden"></span>
                  Roadmaps
                </span>
              </span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div>
              {user ? (
                <div className="text-center space-y-4">
                  <Inputdata />
                  <form
                    action={async () => {
                      "use server"
                      await signOut()
                    }}
                  ></form>
                </div>
              ) : (
                <form
                  action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/" })
                  }}
                >
                  <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gray-100 to-white dark:from-white dark:to-gray-50 px-6 py-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:text-white">
                    <div className="absolute inset-0 bg-blue-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
                    <div className="relative flex items-center justify-center space-x-2">
                      <img src="/google.svg" className="h-5 w-5" alt="" />
                      <span className="font-medium text-lg text-gray-800 dark:text-black transition-colors duration-300 group-hover:text-white">
                        Sign in to Continue
                      </span>
                    </div>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <TerminalChat />

          <div className="mt-32 flex flex-wrap justify-center gap-6 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="relative w-48 h-32 rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src="/api/placeholder/192/128"
                  alt={`AI Generated Landscape ${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-32 flex flex-wrap justify-center items-center gap-12">
            {["Raycast", "Vercel", "Loom", "Cash App"].map((partner) => (
              <div
                key={partner}
                className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

