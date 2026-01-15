import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Check, Copy } from "lucide-react";
import { Pirate } from "@shared/schema";

interface ApiPreviewProps {
  data: Pirate | Pirate[];
  endpoint: string;
}

export function ApiPreview({ data, endpoint }: ApiPreviewProps) {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border-4 border-[#2d2d2d]">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-4 font-mono text-xs text-gray-400">
            GET <span className="text-green-400">{endpoint}</span>
          </span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <pre className="text-sm font-mono text-blue-300">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
}
