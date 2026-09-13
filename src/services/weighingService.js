import storageService from "./storageService";
import { STORAGE_KEYS } from "../utils/constants";
import slotService from "./slotService";

const weighingService = {
  submitWeighing(tokenId, grossWeight, tareWeight) {
    const netWeight = Number(grossWeight) - Number(tareWeight);

    const weighing = {
      id: `weigh-${Date.now()}`,
      tokenId,
      grossWeight: Number(grossWeight),
      tareWeight: Number(tareWeight),
      netWeight,
      confirmedAt: new Date().toISOString(),
    };

    const weighings = storageService.get(STORAGE_KEYS.WEIGHINGS) || [];
    weighings.push(weighing);
    storageService.set(STORAGE_KEYS.WEIGHINGS, weighings);

    slotService.updateTokenStatus(tokenId, "completed");

    return weighing;
  },

  getWeighing(tokenId) {
    const weighings = storageService.get(STORAGE_KEYS.WEIGHINGS) || [];
    return weighings.find((w) => w.tokenId === tokenId);
  },

  getAllWeighings() {
    return storageService.get(STORAGE_KEYS.WEIGHINGS) || [];
  },
};

export default weighingService;