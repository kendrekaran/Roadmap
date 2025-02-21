import { auth, signIn, signOut } from "@comp/auth";
import Navbar from "./components/Navbar";
import Inputdata from "./components/Input";
import TerminalChat from "./components/Chatbot";

export default async function Home() {
  // const roles = [  
  //   "Frontend Developer",  
  //   "Backend Developer",  
  //   "Full Stack Developer",  
  //   "Mobile App Developer",  
  //   "Game Developer",  
  //   "Data Analyst",  
  //   "Data Scientist",  
  //   "Machine Learning Engineer",  
  //   "AI Engineer",  
  //   "DevOps Engineer",  
  //   "Cloud Engineer",  
  //   "Site Reliability Engineer",  
  //   "Security Engineer",  
  //   "Ethical Hacker",  
  //   "Product Manager",  
  //   "Project Manager",  
  //   "QA Engineer",  
  //   "Automation Tester",  
  //   "Blockchain Developer",  
  //   "Embedded Systems Engineer"  
  // ];  

  const session = await auth();
  const user = session?.user;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/50 to-black overflow-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:py-8 text-center relative">
        
        {/* Hero Content */}
        <div className="relative z-10 space-y-8 py-16">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-base bg-gradient-to-b from-white to-gray-600 text-transparent bg-clip-text max-w-4xl mx-auto leading-tight tracking-tight">
            Navigate Your&nbsp;
              <span className="bg-gradient-to-b from-blue-500 to-blue-800 text-transparent bg-clip-text">
              Career&nbsp;<br />
              </span>
              <span className="bg-gradient-to-b from-white to-gray-600 text-transparent bg-clip-text">
              With AI-Powered&nbsp;
              <span className="bg-gradient-to-b from-blue-500 to-blue-800 text-transparent bg-clip-text">
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
                  <form action={async () => {
                    "use server";
                    await signOut();
                  }}>
                  </form>
                </div>
              ) : (
                <form action={async () => {
                  "use server";
                  await signIn("google", {redirectTo: "/"});
                }}>
                  <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-white to-gray-50 px-6 py-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-blue-600 hover:to-blue-700">
                    <div className="absolute inset-0 bg-blue-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
                    <div className="relative flex items-center justify-center space-x-2">
                      <img src="/google.svg" className="h-5 w-5" alt="" />
                      <span className="font-medium text-lg text-black transition-colors duration-300 ">
                        Sign in to Continue
                      </span>
                    </div>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* <div className="flex flex-wrap items-center justify-center   sm:px-36 gap-2">
            {roles.map((role, index) => (
              <button
                key={index}
                className="group relative flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 transition-all duration-300 hover:bg-blue-500/20 hover:shadow-md active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <li className="relative text-xs sm:text-sm">{role}</li>
                <span className="relative ml-1 hidden h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-xs opacity-0 transition-all duration-300 group-hover:flex group-hover:opacity-100">
                  ×
                </span>
              </button>
            ))}
          </div> */}

          {/* <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gj5eq7nbwAAw2hH-CYq89eQp26szuaSS6UFGli6o2Wl1Bw.jpeg"
              alt="AI Image Generation App Interface"
              className="mx-auto relative z-10 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div> */}

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
                className="text-gray-400 text-sm font-medium hover:text-gray-300 transition-colors cursor-pointer"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}