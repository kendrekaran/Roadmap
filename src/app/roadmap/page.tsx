import Navbar from "../components/Navbar";

export default async function SecondPage({
  searchParams,
  }: {
  searchParams: { [key: string]: string | string[] | undefined }
  }) {
  const data = searchParams.data;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/50 to-black overflow-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:py-8 text-center relative">

        <div className="relative z-10 space-y-8 py-16">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-base bg-gradient-to-b from-white to-gray-600 text-transparent bg-clip-text max-w-4xl mx-auto leading-tight tracking-tight">
              {data}&nbsp;
              <span className="bg-gradient-to-b from-blue-500 to-blue-800 text-transparent bg-clip-text">
                - Roadmap
              </span>
            </h1>
          </div>


          
          {/* Bottom Section */}
          <div className="mt-32 flex flex-wrap justify-center items-center gap-12">
            <div className="text-gray-400 text-sm font-medium hover:text-gray-300 transition-colors">
              Bottom Content
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}