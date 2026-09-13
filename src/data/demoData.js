export const DEMO_FARMER = {
  id: "farmer-demo-1",
  name: "Ramesh Kumar",
  nameHi: "रमेश कुमार",
  mobile: "9876543210",
  state: "rajasthan",
  district: "jaipur",
  centre: "jaipur-centre-1",
  farmerId: "F-RJ-10001",
  createdAt: new Date().toISOString(),
};

export const SAMPLE_FARMERS = [
  { id: "farmer-2", name: "Suresh Yadav", nameHi: "सुरेश यादव", mobile: "9876543211", state: "rajasthan", district: "jaipur", centre: "jaipur-centre-1", farmerId: "F-RJ-10002", createdAt: new Date().toISOString() },
  { id: "farmer-3", name: "Mohan Singh", nameHi: "मोहन सिंह", mobile: "9876543212", state: "rajasthan", district: "kota", centre: "kota-centre-1", farmerId: "F-RJ-10003", createdAt: new Date().toISOString() },
  { id: "farmer-4", name: "Kishan Lal", nameHi: "किशन लाल", mobile: "9876543213", state: "haryana", district: "hisar", centre: "hisar-centre-1", farmerId: "F-HR-10004", createdAt: new Date().toISOString() },
  { id: "farmer-5", name: "Harpal Singh", nameHi: "हरपाल सिंह", mobile: "9876543214", state: "punjab", district: "ludhiana", centre: "ludhiana-centre-1", farmerId: "F-PB-10005", createdAt: new Date().toISOString() },
  { id: "farmer-6", name: "Ravi Sharma", nameHi: "रवि शर्मा", mobile: "9876543215", state: "haryana", district: "karnal", centre: "karnal-centre-1", farmerId: "F-HR-10006", createdAt: new Date().toISOString() },
  { id: "farmer-7", name: "Gurpreet Kaur", nameHi: "गुरप्रीत कौर", mobile: "9876543216", state: "punjab", district: "amritsar", centre: "amritsar-centre-1", farmerId: "F-PB-10007", createdAt: new Date().toISOString() },
  { id: "farmer-8", name: "Anil Meena", nameHi: "अनिल मीणा", mobile: "9876543217", state: "rajasthan", district: "sri_ganganagar", centre: "ganganagar-centre-1", farmerId: "F-RJ-10008", createdAt: new Date().toISOString() },
  { id: "farmer-9", name: "Baldev Raj", nameHi: "बलदेव राज", mobile: "9876543218", state: "haryana", district: "rohtak", centre: "rohtak-centre-1", farmerId: "F-HR-10009", createdAt: new Date().toISOString() },
  { id: "farmer-10", name: "Jaswinder Singh", nameHi: "जसविंदर सिंह", mobile: "9876543219", state: "punjab", district: "patiala", centre: "patiala-centre-1", farmerId: "F-PB-10010", createdAt: new Date().toISOString() },
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
  queuePosition: 3,
  estimatedWait: 15,
  createdAt: new Date().toISOString(),
};

export function generateSampleTokens() {
  const crops = ["wheat", "mustard", "barley", "chana"];
  const statuses = ["reached_centre", "quality_inspection", "weighing", "completed"];
  const centres = ["jaipur-centre-1", "kota-centre-1", "karnal-centre-1", "ludhiana-centre-1"];

  return SAMPLE_FARMERS.map((farmer, idx) => ({
    id: `token-sample-${idx + 2}`,
    tokenNumber: `${farmer.state === "rajasthan" ? "RJ" : farmer.state === "haryana" ? "HR" : "PB"}-2026-00${125 + idx}`,
    farmerId: farmer.id,
    farmerName: farmer.name,
    farmerMobile: farmer.mobile,
    centreId: centres[idx % centres.length],
    crop: crops[idx % crops.length],
    quantity: Math.floor(Math.random() * 20) + 5,
    slotTime: "10:00 AM - 11:00 AM",
    status: statuses[idx % statuses.length],
    queuePosition: idx < 4 ? idx + 1 : 0,
    estimatedWait: idx < 4 ? (idx + 1) * 5 : 0,
    createdAt: new Date(Date.now() - (idx + 1) * 1800000).toISOString(),
  }));
}

export function generateSampleNotifications() {
  return [
    {
      id: "notif-1",
      farmerId: "farmer-demo-1",
      title: "स्लॉट बुकिंग पुष्ट",
      type: "sms",
      message: "Your slot has been booked for tomorrow at Jaipur Krishi Mandi. Token: RJ-2026-00124",
      messageHi: "आपका स्लॉट कल जयपुर कृषि मंडी में बुक हो गया है। टोकन: RJ-2026-00124",
      sentAt: new Date().toISOString(),
      read: false,
    },
    {
      id: "notif-2",
      farmerId: "farmer-demo-1",
      title: "किसान सेतु स्वागत",
      type: "inapp",
      message: "Welcome to Kisan Setu! Your farmer ID is F-RJ-10001.",
      messageHi: "किसान सेतु में आपका स्वागत है! आपकी किसान आईडी F-RJ-10001 है।",
      sentAt: new Date(Date.now() - 3600000).toISOString(),
      read: true,
    },
    {
      id: "notif-3",
      farmerId: "farmer-2",
      title: "गुणवत्ता परीक्षण पूर्ण",
      type: "sms",
      message: "Your quality inspection has been completed. Grade: A",
      messageHi: "आपका गुणवत्ता परीक्षण पूर्ण हो गया है। ग्रेड: A",
      sentAt: new Date(Date.now() - 7200000).toISOString(),
      read: false,
    },
  ];
}
