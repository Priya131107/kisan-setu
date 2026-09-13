import React from "react";
import { RotateCcw, Eye } from "lucide-react";
import { useDemoMode } from "../../hooks/useDemoMode";
import { useLanguage } from "../../hooks/useLanguage";

export default function DemoBadge() {
  const { isDemoMode, viewMode, switchView, resetDemoData } = useDemoMode();
  const { t } = useLanguage();

  if (!isDemoMode) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="bg-secondary-400 text-secondary-900 px-4 py-2 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-gentle">
        <span className="text-xs font-bold tracking-wider uppercase">{t.common.demoMode}</span>
        <div className="flex gap-1">
          <button
            onClick={() => switchView(viewMode === "farmer" ? "admin" : "farmer")}
            className="p-1.5 bg-secondary-500 hover:bg-secondary-600 rounded-lg transition-colors"
            title={`Switch to ${viewMode === "farmer" ? "Admin" : "Farmer"} view`}
          >
            <Eye size={14} />
          </button>
          <button
            onClick={resetDemoData}
            className="p-1.5 bg-secondary-500 hover:bg-secondary-600 rounded-lg transition-colors"
            title={t.common.resetDemo}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
      <div className="text-xs text-neutral-500 bg-white/90 px-2 py-1 rounded shadow">
        View: <span className="font-semibold capitalize">{viewMode}</span>
      </div>
    </div>
  );
}