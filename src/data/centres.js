export const STATES = [
  { id: "rajasthan", name: "Rajasthan", nameHi: "राजस्थान" },
  { id: "haryana", name: "Haryana", nameHi: "हरियाणा" },
  { id: "punjab", name: "Punjab", nameHi: "पंजाब" },
];

export const DISTRICTS = {
  rajasthan: [
    { id: "jaipur", name: "Jaipur", nameHi: "जयपुर" },
    { id: "kota", name: "Kota", nameHi: "कोटा" },
    { id: "sri_ganganagar", name: "Sri Ganganagar", nameHi: "श्री गंगानगर" },
  ],
  haryana: [
    { id: "hisar", name: "Hisar", nameHi: "हिसार" },
    { id: "karnal", name: "Karnal", nameHi: "करनाल" },
    { id: "rohtak", name: "Rohtak", nameHi: "रोहतक" },
  ],
  punjab: [
    { id: "ludhiana", name: "Ludhiana", nameHi: "लुधियाना" },
    { id: "amritsar", name: "Amritsar", nameHi: "अमृतसर" },
    { id: "patiala", name: "Patiala", nameHi: "पटियाला" },
  ],
};

export const CENTRES = [
  // Rajasthan
  {
    id: "jaipur-centre-1",
    name: "Jaipur Krishi Mandi",
    nameHi: "जयपुर कृषि उपज मंडी",
    state: "rajasthan",
    district: "jaipur",
    address: "Muhana Mandi, Sanganer, Jaipur",
    phone: "+91-141-2734120",
    operatingHours: "8:00 AM - 5:00 PM",
    capacity: 120,
    crops: ["wheat", "mustard", "barley", "chana"],
    latitude: 26.8206,
    longitude: 75.7667,
    status: "open",
  },
  {
    id: "kota-centre-1",
    name: "Kota Grain Mandi",
    nameHi: "कोटा अनाज मंडी",
    state: "rajasthan",
    district: "kota",
    address: "Bhamashah Mandi, Anantpura, Kota",
    phone: "+91-744-2458900",
    operatingHours: "8:00 AM - 5:00 PM",
    capacity: 150,
    crops: ["wheat", "mustard", "chana", "maize"],
    latitude: 25.1432,
    longitude: 75.8456,
    status: "open",
  },
  {
    id: "ganganagar-centre-1",
    name: "Sri Ganganagar Mandi",
    nameHi: "श्री गंगानगर मंडी",
    state: "rajasthan",
    district: "sri_ganganagar",
    address: "New Mandi Yard, Sri Ganganagar",
    phone: "+91-154-2440123",
    operatingHours: "8:00 AM - 6:00 PM",
    capacity: 200,
    crops: ["wheat", "cotton", "mustard", "barley"],
    latitude: 29.9038,
    longitude: 73.8772,
    status: "open",
  },

  // Haryana
  {
    id: "hisar-centre-1",
    name: "Hisar Krishi Bazar",
    nameHi: "हिसार कृषि बाजार",
    state: "haryana",
    district: "hisar",
    address: "Auto Market Road, Hisar",
    phone: "+91-1662-234567",
    operatingHours: "8:00 AM - 5:00 PM",
    capacity: 100,
    crops: ["wheat", "mustard", "cotton", "bajra"],
    latitude: 29.1492,
    longitude: 75.7217,
    status: "open",
  },
  {
    id: "karnal-centre-1",
    name: "Karnal Krishi Mandi",
    nameHi: "करनाल कृषि मंडी",
    state: "haryana",
    district: "karnal",
    address: "GT Road, Near Railway Station, Karnal",
    phone: "+91-184-2256789",
    operatingHours: "7:30 AM - 5:30 PM",
    capacity: 180,
    crops: ["wheat", "rice", "sugarcane"],
    latitude: 29.6857,
    longitude: 76.9905,
    status: "open",
  },
  {
    id: "rohtak-centre-1",
    name: "Rohtak Mandi Board",
    nameHi: "रोहतक मंडी बोर्ड",
    state: "haryana",
    district: "rohtak",
    address: "Delhi Road, Rohtak",
    phone: "+91-1262-256789",
    operatingHours: "8:00 AM - 5:00 PM",
    capacity: 110,
    crops: ["wheat", "mustard", "bajra", "chana"],
    latitude: 28.8955,
    longitude: 76.6066,
    status: "open",
  },

  // Punjab
  {
    id: "ludhiana-centre-1",
    name: "Ludhiana Grain Market",
    nameHi: "लुधियाना अनाज मंडी",
    state: "punjab",
    district: "ludhiana",
    address: "Gill Road, Ludhiana",
    phone: "+91-161-2401234",
    operatingHours: "7:00 AM - 6:00 PM",
    capacity: 250,
    crops: ["wheat", "rice", "maize"],
    latitude: 30.901,
    longitude: 75.8573,
    status: "open",
  },
  {
    id: "amritsar-centre-1",
    name: "Amritsar Krishi Mandi",
    nameHi: "अमृतसर कृषि मंडी",
    state: "punjab",
    district: "amritsar",
    address: "Bhagtanwala, Amritsar",
    phone: "+91-183-2554321",
    operatingHours: "7:30 AM - 5:30 PM",
    capacity: 160,
    crops: ["wheat", "rice", "barley"],
    latitude: 31.634,
    longitude: 74.8723,
    status: "open",
  },
  {
    id: "patiala-centre-1",
    name: "Patiala Grain Mandi",
    nameHi: "पटियाला अनाज मंडी",
    state: "punjab",
    district: "patiala",
    address: "Sirhind Road, Patiala",
    phone: "+91-175-2305678",
    operatingHours: "8:00 AM - 5:00 PM",
    capacity: 140,
    crops: ["wheat", "rice", "sugarcane"],
    latitude: 30.3398,
    longitude: 76.3869,
    status: "open",
  },
];

export function getCentresByDistrict(districtId) {
  return CENTRES.filter((c) => c.district === districtId);
}

export function getCentresByState(stateId) {
  return CENTRES.filter((c) => c.state === stateId);
}

export function getCentreById(centreId) {
  return CENTRES.find((c) => c.id === centreId);
}
