import storageService from "./storageService";
import { STORAGE_KEYS } from "../utils/constants";

const queueService = {
  getQueuePosition(tokenId) {
    const tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    const token = tokens.find((t) => t.id === tokenId);
    if (!token) return null;

    return {
      tokenNumber: token.tokenNumber,
      position: token.queuePosition || 0,
      estimatedWait: token.estimatedWait || 0,
      status: token.status,
    };
  },

  refreshQueue(tokenId) {
    let tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    const idx = tokens.findIndex((t) => t.id === tokenId);
    if (idx === -1) return null;

    const token = tokens[idx];
    const newPosition = Math.max(0, (token.queuePosition || 1) - Math.floor(Math.random() * 2 + 1));
    const newWait = Math.max(0, newPosition * 5);

    let newStatus = token.status;
    if (newPosition === 0 && token.status === "token_generated") {
      newStatus = "reached_centre";
    }

    tokens[idx] = {
      ...token,
      queuePosition: newPosition,
      estimatedWait: newWait,
      status: newStatus,
    };
    storageService.set(STORAGE_KEYS.TOKENS, tokens);

    return {
      tokenNumber: token.tokenNumber,
      position: newPosition,
      estimatedWait: newWait,
      status: newStatus,
    };
  },

  getCurrentlyServing(centreId) {
    const tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    const activeTokens = tokens
      .filter((t) => t.centreId === centreId && ["reached_centre", "quality_inspection", "weighing"].includes(t.status))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return activeTokens[0] || null;
  },

  getQueueByCentre(centreId) {
    const tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    return tokens
      .filter((t) => t.centreId === centreId && t.status !== "completed")
      .sort((a, b) => (a.queuePosition || 0) - (b.queuePosition || 0));
  },
};

export default queueService;