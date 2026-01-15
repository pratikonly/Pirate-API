import { Pirate } from "@shared/schema";
import { motion } from "framer-motion";
import { Skull, Anchor, Trophy } from "lucide-react";

interface PirateCardProps {
  pirate: Pirate;
  index?: number;
}

export function PirateCard({ pirate, index = 0 }: PirateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="parchment-card group relative overflow-hidden rounded-xl"
    >
      {/* Wanted Poster Header */}
      <div className="bg-[#5d4037] text-[#f4e4bc] text-center py-2 font-heading tracking-widest text-2xl uppercase border-b-2 border-[#3e2b25] relative">
        <span className="relative z-10">WANTED</span>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
      </div>

      <div className="p-4 flex flex-col items-center">
        {/* Image Container with rugged border */}
        <div className="relative w-full aspect-[3/4] mb-4 bg-muted rounded-lg overflow-hidden border-4 border-[#3e2b25] shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
          <img 
            src={pirate.imageUrl} 
            alt={pirate.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Paper texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        </div>

        {/* Name & Role */}
        <h3 className="text-3xl font-heading text-secondary mb-1 text-center">
          {pirate.name}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground font-bold italic mb-4">
          <Anchor className="w-4 h-4" />
          <span>{pirate.role}</span>
        </div>

        {/* Bounty Box */}
        <div className="w-full bg-[#f4e4bc] border-2 border-dashed border-[#8b4513] p-3 rounded-lg flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-[#8b4513]">
            <Skull className="w-5 h-5" />
            <span className="font-bold text-xs uppercase tracking-wider">Bounty</span>
          </div>
          <div className="font-heading text-xl text-[#8b4513] flex items-center gap-1">
            <span className="text-sm font-sans font-bold">฿</span>
            {pirate.bounty}
          </div>
        </div>
      </div>

      {/* "Dead or Alive" footer */}
      <div className="absolute bottom-2 left-0 w-full text-center opacity-10 pointer-events-none font-heading text-4xl text-foreground -rotate-6">
        DEAD OR ALIVE
      </div>
    </motion.div>
  );
}
