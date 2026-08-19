"use client";

import { useState } from "react";
import { brand, whatsappLink } from "@/data/brand";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={whatsappLink("Hi! I'm interested in ANSA Naturals products.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <span
        className={`hidden sm:inline-block bg-white text-gray-800 text-sm font-medium px-3 py-2 rounded-lg shadow-lg transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Chat with us!
      </span>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

        {/* Main circle */}
        <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg
            viewBox="0 0 32 32"
            fill="white"
            className="w-7 h-7"
          >
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.374L1.054 31.25l6.112-1.976A15.907 15.907 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.318 22.594c-.39 1.1-1.932 2.014-3.166 2.27-.84.174-1.936.312-5.618-1.206-4.712-1.94-7.74-6.71-7.974-7.026-.226-.316-1.896-2.524-1.896-4.814 0-2.29 1.2-3.416 1.628-3.88.39-.426.92-.548 1.224-.548.15 0 .286.008.41.014.4.016.6.04.864.66.33.772 1.134 2.758 1.232 2.954.098.196.196.464.058.736-.134.286-.25.464-.484.71-.234.246-.464.44-.706.708-.214.238-.45.492-.184.908.266.414 1.184 1.95 2.54 3.16 1.74 1.554 3.16 2.036 3.672 2.262.39.17.758.08 1.006-.18.316-.334.704-.87 1.1-1.39.278-.37.628-.416.972-.28.35.13 2.218 1.046 2.6 1.236.382.19.636.286.732.444.096.158.096.916-.294 1.826z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
