export const APP_NAME = "Kisan Setu";
export const APP_NAME_HI = "à¤•à¤¿à¤¸à¤¾à¤¨ à¤¸à¥‡à¤¤à¥";
export const APP_TAGLINE = "Smart Procurement. Less Waiting. More Transparency.";
export const APP_TAGLINE_HI = "à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤–à¤°à¥€à¤¦à¥¤ à¤•à¤® à¤ªà¥à¤°à¤¤à¥€à¤•à¥à¤·à¤¾à¥¤ à¤…à¤§à¤¿à¤• à¤ªà¤¾à¤°à¤¦à¤°à¥à¤¶à¤¿à¤¤à¤¾à¥¤";

export const DEMO_OTP = "1234";
export const DEMO_MOBILE = "9876543210";

export const STORAGE_KEYS = {
  FARMERS: "ks_farmers",
  CURRENT_FARMER: "ks_current_farmer",
  SLOTS: "ks_slots",
  TOKENS: "ks_tokens",
  INSPECTIONS: "ks_inspections",
  WEIGHINGS: "ks_weighings",
  NOTIFICATIONS: "ks_notifications",
  LANGUAGE: "ks_language",
  DEMO_MODE: "ks_demo_mode",
  DEMO_INITIALIZED: "ks_demo_initialized",
};

export const SLOT_TIMES = [
  { id: "morning-1", label: "8:00 AM - 9:00 AM", labelHi: "à¤¸à¥à¤¬à¤¹ 8:00 - 9:00" },
  { id: "morning-2", label: "9:00 AM - 10:00 AM", labelHi: "à¤¸à¥à¤¬à¤¹ 9:00 - 10:00" },
  { id: "morning-3", label: "10:00 AM - 11:00 AM", labelHi: "à¤¸à¥à¤¬à¤¹ 10:00 - 11:00" },
  { id: "morning-4", label: "11:00 AM - 12:00 PM", labelHi: "à¤¸à¥à¤¬à¤¹ 11:00 - à¤¦à¥‹à¤ªà¤¹à¤° 12:00" },
  { id: "afternoon-1", label: "12:00 PM - 1:00 PM", labelHi: "à¤¦à¥‹à¤ªà¤¹à¤° 12:00 - 1:00" },
  { id: "afternoon-2", label: "2:00 PM - 3:00 PM", labelHi: "à¤¦à¥‹à¤ªà¤¹à¤° 2:00 - 3:00" },
  { id: "afternoon-3", label: "3:00 PM - 4:00 PM", labelHi: "à¤¦à¥‹à¤ªà¤¹à¤° 3:00 - 4:00" },
  { id: "evening-1", label: "4:00 PM - 5:00 PM", labelHi: "à¤¶à¤¾à¤® 4:00 - 5:00" },
];

export const PROCUREMENT_STAGES = [
  { id: "registered", label: "Registration", labelHi: "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£", icon: "ClipboardList" },
  { id: "slot_allocated", label: "Slot Allocated", labelHi: "à¤¸à¥à¤²à¥‰à¤Ÿ à¤†à¤µà¤‚à¤Ÿà¤¿à¤¤", icon: "CalendarCheck" },
  { id: "token_generated", label: "Token Generated", labelHi: "à¤Ÿà¥‹à¤•à¤¨ à¤œà¤¨à¤°à¥‡à¤Ÿ", icon: "Ticket" },
  { id: "reached_centre", label: "Reached Centre", labelHi: "à¤•à¥‡à¤‚à¤¦à¥à¤° à¤ªà¤¹à¥à¤‚à¤šà¥‡", icon: "MapPin" },
  { id: "quality_inspection", label: "Quality Inspection", labelHi: "à¤—à¥à¤£à¤µà¤¤à¥à¤¤à¤¾ à¤œà¤¾à¤‚à¤š", icon: "Search" },
  { id: "weighing", label: "Weighing", labelHi: "à¤¤à¥Œà¤²", icon: "Scale" },
  { id: "completed", label: "Completed", labelHi: "à¤ªà¥‚à¤°à¥à¤£", icon: "CheckCircle" },
];

export const STATUS_COLORS = {
  registered: "bg-blue-100 text-blue-800",
  slot_allocated: "bg-indigo-100 text-indigo-800",
  token_generated: "bg-purple-100 text-purple-800",
  reached_centre: "bg-yellow-100 text-yellow-800",
  quality_inspection: "bg-orange-100 text-orange-800",
  weighing: "bg-cyan-100 text-cyan-800",
  completed: "bg-green-100 text-green-800",
  waiting: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  pass: "bg-green-100 text-green-800",
  needs_review: "bg-yellow-100 text-yellow-800",
  reject: "bg-red-100 text-red-800",
};