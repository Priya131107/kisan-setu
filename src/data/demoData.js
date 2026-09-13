export const DEMO_FARMER = {
  id: "farmer-demo-1",
  name: "Ramesh Kumar",
  nameHi: "à¤°à¤®à¥‡à¤¶ à¤•à¥à¤®à¤¾à¤°",
  mobile: "9876543210",
  state: "rajasthan",
  district: "jaipur",
  centre: "jaipur-centre-1",
  farmerId: "F-RJ-10001",
  createdAt: new Date().toISOString(),
};

export const SAMPLE_FARMERS = [
  { id: "farmer-2", name: "Suresh Yadav", nameHi: "à¤¸à¥à¤°à¥‡à¤¶ à¤¯à¤¾à¤¦à¤µ", mobile: "9876543211", state: "rajasthan", district: "jaipur", centre: "jaipur-centre-1", farmerId: "F-RJ-10002", createdAt: new Date().toISOString() },
  { id: "farmer-3", name: "Mohan Singh", nameHi: "à¤®à¥‹à¤¹à¤¨ à¤¸à¤¿à¤‚à¤¹", mobile: "9876543212", state: "rajasthan", district: "kota", centre: "kota-centre-1", farmerId: "F-RJ-10003", createdAt: new Date().toISOString() },
  { id: "farmer-4", name: "Kishan Lal", nameHi: "à¤•à¤¿à¤¶à¤¨ à¤²à¤¾à¤²", mobile: "9876543213", state: "haryana", district: "hisar", centre: "hisar-centre-1", farmerId: "F-HR-10004", createdAt: new Date().toISOString() },
  { id: "farmer-5", name: "Harpal Singh", nameHi: "à¤¹à¤°à¤ªà¤¾à¤² à¤¸à¤¿à¤‚à¤¹", mobile: "9876543214", state: "punjab", district: "ludhiana", centre: "ludhiana-centre-1", farmerId: "F-PB-10005", createdAt: new Date().toISOString() },
  { id: "farmer-6", name: "Ravi Sharma", nameHi: "à¤°à¤µà¤¿ à¤¶à¤°à¥à¤®à¤¾", mobile: "9876543215", state: "haryana", district: "karnal", centre: "karnal-centre-1", farmerId: "F-HR-10006", createdAt: new Date().toISOString() },
  { id: "farmer-7", name: "Gurpreet Kaur", nameHi: "à¤—à¥à¤°à¤ªà¥à¤°à¥€à¤¤ à¤•à¥Œà¤°", mobile: "9876543216", state: "punjab", district: "amritsar", centre: "amritsar-centre-1", farmerId: "F-PB-10007", createdAt: new Date().toISOString() },
  { id: "farmer-8", name: "Anil Meena", nameHi: "à¤…à¤¨à¤¿à¤² à¤®à¥€à¤£à¤¾", mobile: "9876543217", state: "rajasthan", district: "sri_ganganagar", centre: "ganganagar-centre-1", farmerId: "F-RJ-10008", createdAt: new Date().toISOString() },
  { id: "farmer-9", name: "Baldev Raj", nameHi: "à¤¬à¤²à¤¦à¥‡à¤µ à¤°à¤¾à¤œ", mobile: "9876543218", state: "haryana", district: "rohtak", centre: "rohtak-centre-1", farmerId: "F-HR-10009", createdAt: new Date().toISOString() },
  { id: "farmer-10", name: "Jaswinder Singh", nameHi: "à¤œà¤¸à¤µà¤¿à¤‚à¤¦à¤° à¤¸à¤¿à¤‚à¤¹", mobile: "9876543219", state: "punjab", district: "patiala", centre: "patiala-centre-1", farmerId: "F-PB-10010", createdAt: new Date().toISOString() },
];

export const DEMO_SLOT = {
  id: "slot-demo-1",
  farmerId: "farmer-demo-1",
  centreId: "jaipur-centre-1",
  crop: "wheat",
  quantity: 10,
  date: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; })(),
  timeSlot: "morning-2",
  tokenId: "token-demo-1",
  status: "token_generated",
  bookedAt: new Date().toISOString(),
};

export const DEMO_TOKEN = {
  id: "token-demo-1",
  tokenNumber: "RJ-2026-00124",
  farmerId: "farmer-demo-1",
  centreId: "jaipur-centre-1",
  slotId: "slot-demo-1",
  status: "token_generated",
  queuePosition: 5,
  estimatedWait: 25,
  createdAt: new Date().toISOString(),
};

export function generateSampleTokens() {
  const crops = ["wheat", "rice", "mustard", "barley", "maize"];
  const statuses = ["waiting", "reached_centre", "quality_inspection", "weighing", "completed"];
  const tokens = [];
  
  SAMPLE_FARMERS.forEach((farmer, idx) => {
    tokens.push({
      id: `token-sample-${idx + 2}`,
      tokenNumber: `${farmer.farmerId.split("-")[1]}-2026-${String(idx + 200).padStart(5, "0")}`,
      farmerId: farmer.id,
      centreId: farmer.centre,
      slotId: `slot-sample-${idx + 2}`,
      status: statuses[idx % statuses.length],
      queuePosition: Math.floor(Math.random() * 15) + 1,
      estimatedWait: Math.floor(Math.random() * 45) + 5,
      crop: crops[idx % crops.length],
      quantity: Math.floor(Math.random() * 20) + 5,
      createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    });
  });
  return tokens;
}

export function generateSampleNotifications() {
  return [
    { id: "notif-1", farmerId: "farmer-demo-1", type: "sms", message: "Your slot has been booked for tomorrow at Jaipur Krishi Mandi. Token: RJ-2026-00124", messageHi: "à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤²à¥‰à¤Ÿ à¤•à¤² à¤œà¤¯à¤ªà¥à¤° à¤•à¥ƒà¤·à¤¿ à¤®à¤‚à¤¡à¥€ à¤®à¥‡à¤‚ à¤¬à¥à¤• à¤¹à¥‹ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤ à¤Ÿà¥‹à¤•à¤¨: RJ-2026-00124", sentAt: new Date().toISOString(), read: false },
    { id: "notif-2", farmerId: "farmer-demo-1", type: "inapp", message: "Welcome to Kisan Setu! Your farmer ID is F-RJ-10001.", messageHi: "à¤•à¤¿à¤¸à¤¾à¤¨ à¤¸à¥‡à¤¤à¥ à¤®à¥‡à¤‚ à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆ! à¤†à¤ªà¤•à¥€ à¤•à¤¿à¤¸à¤¾à¤¨ à¤†à¤ˆà¤¡à¥€ F-RJ-10001 à¤¹à¥ˆà¥¤", sentAt: new Date(Date.now() - 3600000).toISOString(), read: true },
    { id: "notif-3", farmerId: "farmer-2", type: "sms", message: "Your quality inspection has been completed. Grade: A", messageHi: "à¤†à¤ªà¤•à¤¾ à¤—à¥à¤£à¤µà¤¤à¥à¤¤à¤¾ à¤¨à¤¿à¤°à¥€à¤•à¥à¤·à¤£ à¤ªà¥‚à¤°à¥à¤£ à¤¹à¥‹ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤ à¤—à¥à¤°à¥‡à¤¡: A", sentAt: new Date(Date.now() - 7200000).toISOString(), read: false },
  ];
}