import { usePirates, useRandomPirate } from "@/hooks/use-pirates";
import { PirateCard } from "@/components/PirateCard";
import { ApiPreview } from "@/components/ApiPreview";
import { Compass, Map, RefreshCw, ScrollText, Ship } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: pirates, isLoading } = usePirates();
  const { data: randomPirate, refetch: fetchRandom, isRefetching: isRandomLoading } = useRandomPirate();
  const [view, setView] = useState<'gallery' | 'api'>('gallery');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0eadd]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-8 h-8 text-secondary animate-pulse" />
            </div>
          </div>
          <p className="font-heading text-2xl text-secondary animate-pulse">Loading Crew...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative py-20 px-4 md:px-8 text-center border-b-4 border-[#8b4513] shadow-lg overflow-hidden bg-secondary">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/nautical-leather.png')]"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-20 animate-float-slow hidden md:block">
          <Ship className="w-32 h-32 text-white" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20 animate-float-delayed hidden md:block">
          <Map className="w-32 h-32 text-white" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl text-primary-foreground drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] mb-4">
              The Grand Line API
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 font-serif max-w-2xl mx-auto leading-relaxed">
              "Wealth, fame, power... fetch it all with a single request!"
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setView('gallery')}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center gap-2
                ${view === 'gallery' 
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-105' 
                  : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <Map className="w-5 h-5" /> Crew Gallery
            </button>
            <button
              onClick={() => setView('api')}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center gap-2
                ${view === 'api' 
                  ? 'bg-accent text-accent-foreground shadow-[0_0_15px_rgba(252,165,165,0.5)] scale-105' 
                  : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <ScrollText className="w-5 h-5" /> API Documentation
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {view === 'gallery' ? (
          <div className="space-y-12">
            {/* Random Pirate Feature */}
            <div className="bg-[#fdfbf7] border-4 border-[#8b4513] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full -mr-8 -mt-8"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-4xl text-secondary mb-4">Feeling Lucky?</h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    Summon a random crew member from the database. Who will join your adventure?
                  </p>
                  <button 
                    onClick={() => fetchRandom()}
                    disabled={isRandomLoading}
                    className="btn-primary inline-flex items-center gap-2 group"
                  >
                    <RefreshCw className={`w-5 h-5 ${isRandomLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    {isRandomLoading ? 'Summoning...' : 'Summon Random Pirate'}
                  </button>
                </div>
                
                {randomPirate && (
                  <div className="w-full max-w-xs transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <PirateCard pirate={randomPirate} />
                  </div>
                )}
              </div>
            </div>

            {/* Main Gallery Grid */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-5xl text-secondary drop-shadow-sm">Wanted Posters</h2>
                <div className="bg-white/50 px-4 py-2 rounded-lg text-sm font-bold text-muted-foreground border border-black/5">
                  Total Bounty: ฿ {pirates?.reduce((acc, p) => acc + parseInt(p.bounty.replace(/,/g, '')), 0).toLocaleString()}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {pirates?.map((pirate, index) => (
                  <PirateCard key={pirate.id} pirate={pirate} index={index} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="prose prose-stone lg:prose-xl mx-auto text-center mb-12">
              <h2 className="font-heading text-5xl">Developer's Log</h2>
              <p>Integrate the Straw Hat Grand Fleet into your own applications with our simple REST API.</p>
            </div>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px bg-secondary/20 flex-1"></div>
                <h3 className="text-3xl font-heading text-secondary">Get All Pirates</h3>
                <div className="h-px bg-secondary/20 flex-1"></div>
              </div>
              <p className="text-center text-muted-foreground">Retrieve the complete list of available crew members.</p>
              <ApiPreview data={pirates || []} endpoint="/api/pirates" />
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px bg-secondary/20 flex-1"></div>
                <h3 className="text-3xl font-heading text-secondary">Get Random Pirate</h3>
                <div className="h-px bg-secondary/20 flex-1"></div>
              </div>
              <p className="text-center text-muted-foreground">Fetch a single random character profile.</p>
              <ApiPreview 
                data={randomPirate || (pirates?.[0] as Pirate) || { id: 1, name: "Loading...", role: "Loading...", bounty: "0", imageUrl: "" }} 
                endpoint="/api/pirates/random" 
              />
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t-4 border-[#8b4513] bg-[#5d4037] text-[#f4e4bc] py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Anchor className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h2 className="font-heading text-4xl mb-4">To Be Continued...</h2>
          <p className="opacity-60 font-mono text-sm">
            Built with React, Tailwind, and the Will of D.
          </p>
        </div>
      </footer>
    </div>
  );
}
