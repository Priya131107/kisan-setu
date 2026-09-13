import storageService from "./storageService";
import { STORAGE_KEYS } from "../utils/constants";
import slotService from "./slotService";

const inspectionService = {
  submitInspection(tokenId, data) {
    const { moisture, foreignMaterial, damagedGrains, grade, remarks, result } = data;

    const inspection = {
      id: `insp-${Date.now()}`,
      tokenId,
      moisture: Number(moisture),
      foreignMaterial: Number(foreignMaterial),
      damagedGrains: Number(damagedGrains),
      grade,
      remarks,
      result,
      inspectedAt: new Date().toISOString(),
    };

    const inspections = storageService.get(STORAGE_KEYS.INSPECTIONS) || [];
    inspections.push(inspection);
    storageService.set(STORAGE_KEYS.INSPECTIONS, inspections);

    if (result === "pass") {
      slotService.updateTokenStatus(tokenId, "weighing");
    } else {
      slotService.updateTokenStatus(tokenId, "quality_inspection");
    }

    return inspection;
  },

  getInspection(tokenId) {
    const inspections = storageService.get(STORAGE_KEYS.INSPECTIONS) || [];
    return inspections.find((i) => i.tokenId === tokenId);
  },

  getAllInspections() {
    return storageService.get(STORAGE_KEYS.INSPECTIONS) || [];
  },
};

export default inspectionService;