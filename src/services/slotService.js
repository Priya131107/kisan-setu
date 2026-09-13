import storageService from "./storageService";
import { STORAGE_KEYS, SLOT_TIMES } from "../utils/constants";
import { generateToken } from "../utils/tokenGenerator";

const slotService = {
  getAvailableSlots(centreId, date) {
    const allSlots = storageService.get(STORAGE_KEYS.SLOTS) || [];
    const booked = allSlots
      .filter((s) => s.centreId === centreId && s.date === date)
      .map((s) => s.timeSlot);

    return SLOT_TIMES.map((slot) => ({
      ...slot,
      available: !booked.includes(slot.id) || booked.filter((b) => b === slot.id).length < 15,
      bookedCount: booked.filter((b) => b === slot.id).length,
    }));
  },

  bookSlot(farmerId, centreId, crop, quantity, date, timeSlot, state) {
    const tokenNumber = generateToken(state);
    const slotId = `slot-${Date.now()}`;
    const tokenId = `token-${Date.now()}`;

    const slot = {
      id: slotId,
      farmerId,
      centreId,
      crop,
      quantity: Number(quantity),
      date,
      timeSlot,
      tokenId,
      status: "token_generated",
      bookedAt: new Date().toISOString(),
    };

    const token = {
      id: tokenId,
      tokenNumber,
      farmerId,
      centreId,
      slotId,
      crop,
      quantity: Number(quantity),
      status: "token_generated",
      queuePosition: Math.floor(Math.random() * 10) + 3,
      estimatedWait: Math.floor(Math.random() * 30) + 10,
      createdAt: new Date().toISOString(),
    };

    const slots = storageService.get(STORAGE_KEYS.SLOTS) || [];
    slots.push(slot);
    storageService.set(STORAGE_KEYS.SLOTS, slots);

    const tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    tokens.push(token);
    storageService.set(STORAGE_KEYS.TOKENS, tokens);

    return { slot, token };
  },

  getSlotsByFarmer(farmerId) {
    const slots = storageService.get(STORAGE_KEYS.SLOTS) || [];
    return slots.filter((s) => s.farmerId === farmerId);
  },

  getSlotById(slotId) {
    const slots = storageService.get(STORAGE_KEYS.SLOTS) || [];
    return slots.find((s) => s.id === slotId);
  },

  getTokenByFarmer(farmerId) {
    const tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    return tokens.filter((t) => t.farmerId === farmerId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getTokenById(tokenId) {
    const tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    return tokens.find((t) => t.id === tokenId);
  },

  getTokenByNumber(tokenNumber) {
    const tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    return tokens.find((t) => t.tokenNumber === tokenNumber);
  },

  getAllTokens() {
    return storageService.get(STORAGE_KEYS.TOKENS) || [];
  },

  updateTokenStatus(tokenId, status) {
    let tokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    tokens = tokens.map((t) => (t.id === tokenId ? { ...t, status } : t));
    storageService.set(STORAGE_KEYS.TOKENS, tokens);

    let slots = storageService.get(STORAGE_KEYS.SLOTS) || [];
    const token = tokens.find((t) => t.id === tokenId);
    if (token) {
      slots = slots.map((s) => (s.id === token.slotId ? { ...s, status } : s));
      storageService.set(STORAGE_KEYS.SLOTS, slots);
    }
  },

  getSmartRecommendation(centreId, date) {
    const available = this.getAvailableSlots(centreId, date);
    const best = available
      .filter((s) => s.available)
      .sort((a, b) => a.bookedCount - b.bookedCount)[0];

    if (!best) return null;

    return {
      recommendedSlot: best,
      reason: `This slot has the lowest queue load (${best.bookedCount} farmers booked). Expected wait time: ~${(best.bookedCount + 1) * 5} minutes.`,
      reasonHi: `à¤‡à¤¸ à¤¸à¥à¤²à¥‰à¤Ÿ à¤®à¥‡à¤‚ à¤¸à¤¬à¤¸à¥‡ à¤•à¤® à¤•à¤¤à¤¾à¤° à¤¹à¥ˆ (${best.bookedCount} à¤•à¤¿à¤¸à¤¾à¤¨ à¤¬à¥à¤•)à¥¤ à¤…à¤¨à¥à¤®à¤¾à¤¨à¤¿à¤¤ à¤ªà¥à¤°à¤¤à¥€à¤•à¥à¤·à¤¾ à¤¸à¤®à¤¯: ~${(best.bookedCount + 1) * 5} à¤®à¤¿à¤¨à¤Ÿà¥¤`,
      confidence: Math.max(60, 95 - best.bookedCount * 5),
    };
  },
};

export default slotService;