import React from "react";
import { Sprout } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Sprout size={18} className="text-white" />
            </div>
            <span className="font-heading font-semibold text-white">Kisan Setu</span>
          </div>
          <div className="text-sm text-center">
            <p>Kisan Setu - Smart Agricultural Procurement Platform</p>
            <p className="text-neutral-500">Less Waiting. More Transparency.</p>
          </div>
          <p className="text-xs text-neutral-500">&copy; {new Date().getFullYear()} Kisan Setu</p>
        </div>
      </div>
    </footer>
  );
}