import storageService from "./storageService";
import { STORAGE_KEYS, DEMO_OTP } from "../utils/constants";
import { DEMO_FARMER, SAMPLE_FARMERS } from "../data/demoData";
import { generateFarmerId } from "../utils/tokenGenerator";

const farmerService = {
  login(mobile, otp) {
    if (otp !== DEMO_OTP) {
      return { success: false, error: "Invalid OTP" };
    }

    let farmers = storageService.get(STORAGE_KEYS.FARMERS) || [];
    let farmer = farmers.find((f) => f.mobile === mobile);

    if (!farmer) {
      farmer = {
        id: `farmer-${Date.now()}`,
        name: mobile === DEMO_FARMER.mobile ? DEMO_FARMER.name : "Farmer",
        nameHi: mobile === DEMO_FARMER.mobile ? DEMO_FARMER.nameHi : "à¤•à¤¿à¤¸à¤¾à¤¨",
        mobile,
        state: mobile === DEMO_FARMER.mobile ? DEMO_FARMER.state : "",
        district: mobile === DEMO_FARMER.mobile ? DEMO_FARMER.district : "",
        centre: mobile === DEMO_FARMER.mobile ? DEMO_FARMER.centre : "",
        farmerId: mobile === DEMO_FARMER.mobile ? DEMO_FARMER.farmerId : generateFarmerId("rajasthan"),
        createdAt: new Date().toISOString(),
      };
      if (mobile === DEMO_FARMER.mobile) {
        farmer = { ...DEMO_FARMER };
      }
      farmers.push(farmer);
      storageService.set(STORAGE_KEYS.FARMERS, farmers);
    }

    storageService.set(STORAGE_KEYS.CURRENT_FARMER, farmer);
    return { success: true, farmer };
  },

  getCurrentFarmer() {
    return storageService.get(STORAGE_KEYS.CURRENT_FARMER);
  },

  getFarmer(id) {
    const farmers = storageService.get(STORAGE_KEYS.FARMERS) || [];
    return farmers.find((f) => f.id === id);
  },

  getAllFarmers() {
    return storageService.get(STORAGE_KEYS.FARMERS) || [];
  },

  updateFarmer(updatedFarmer) {
    let farmers = storageService.get(STORAGE_KEYS.FARMERS) || [];
    farmers = farmers.map((f) => (f.id === updatedFarmer.id ? updatedFarmer : f));
    storageService.set(STORAGE_KEYS.FARMERS, farmers);

    const current = this.getCurrentFarmer();
    if (current && current.id === updatedFarmer.id) {
      storageService.set(STORAGE_KEYS.CURRENT_FARMER, updatedFarmer);
    }
  },

  logout() {
    storageService.remove(STORAGE_KEYS.CURRENT_FARMER);
  },

  initializeDemoData() {
    const existing = storageService.get(STORAGE_KEYS.FARMERS);
    if (!existing || existing.length === 0) {
      const allFarmers = [DEMO_FARMER, ...SAMPLE_FARMERS];
      storageService.set(STORAGE_KEYS.FARMERS, allFarmers);
    }
  },
};

export default farmerService;