const storageService = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing ${key} to localStorage:`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error removing ${key} from localStorage:`, e);
      return false;
    }
  },

  clear() {
    try {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith("ks_"));
      keys.forEach((k) => localStorage.removeItem(k));
      return true;
    } catch (e) {
      console.error("Error clearing localStorage:", e);
      return false;
    }
  },
};

export default storageService;