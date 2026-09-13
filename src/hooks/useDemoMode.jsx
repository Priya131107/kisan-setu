import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import storageService from "../services/storageService";
import farmerService from "../services/farmerService";
import { DEMO_FARMER, DEMO_SLOT, DEMO_TOKEN, SAMPLE_FARMERS, generateSampleTokens, generateSampleNotifications } from "../data/demoData";

const DemoContext = createContext();

export function DemoProvider({ children }) {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [viewMode, setViewMode] = useState("farmer");

  const initializeDemo = useCallback(() => {
    const initialized = storageService.get(STORAGE_KEYS.DEMO_INITIALIZED);
    if (initialized) return;

    // Initialize farmers
    const allFarmers = [DEMO_FARMER, ...SAMPLE_FARMERS];
    storageService.set(STORAGE_KEYS.FARMERS, allFarmers);

    // Initialize slots
    storageService.set(STORAGE_KEYS.SLOTS, [DEMO_SLOT]);

    // Initialize tokens
    const sampleTokens = generateSampleTokens();
    storageService.set(STORAGE_KEYS.TOKENS, [DEMO_TOKEN, ...sampleTokens]);

    // Initialize notifications
    const sampleNotifs = generateSampleNotifications();
    storageService.set(STORAGE_KEYS.NOTIFICATIONS, sampleNotifs);

    // Initialize inspections and weighings as empty
    storageService.set(STORAGE_KEYS.INSPECTIONS, []);
    storageService.set(STORAGE_KEYS.WEIGHINGS, []);

    storageService.set(STORAGE_KEYS.DEMO_INITIALIZED, true);
  }, []);

  useEffect(() => {
    initializeDemo();
  }, [initializeDemo]);

  const resetDemoData = useCallback(() => {
    storageService.clear();
    storageService.set(STORAGE_KEYS.DEMO_INITIALIZED, false);
    initializeDemo();
    window.location.reload();
  }, [initializeDemo]);

  const switchView = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  return (
    <DemoContext.Provider value={{ isDemoMode, viewMode, switchView, resetDemoData }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoMode must be used within a DemoProvider");
  }
  return context;
}