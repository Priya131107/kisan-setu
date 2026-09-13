export const CROPS = [
  { id: "wheat", name: "Wheat", nameHi: "à¤—à¥‡à¤¹à¥‚à¤‚", msp: 2275, unit: "quintal" },
  { id: "rice", name: "Rice (Paddy)", nameHi: "à¤šà¤¾à¤µà¤² (à¤§à¤¾à¤¨)", msp: 2203, unit: "quintal" },
  { id: "mustard", name: "Mustard", nameHi: "à¤¸à¤°à¤¸à¥‹à¤‚", msp: 5650, unit: "quintal" },
  { id: "barley", name: "Barley", nameHi: "à¤œà¥Œ", msp: 1850, unit: "quintal" },
  { id: "maize", name: "Maize", nameHi: "à¤®à¤•à¥à¤•à¤¾", msp: 2090, unit: "quintal" },
  { id: "cotton", name: "Cotton", nameHi: "à¤•à¤ªà¤¾à¤¸", msp: 7020, unit: "quintal" },
  { id: "sugarcane", name: "Sugarcane", nameHi: "à¤—à¤¨à¥à¤¨à¤¾", msp: 315, unit: "quintal" },
  { id: "bajra", name: "Bajra (Pearl Millet)", nameHi: "à¤¬à¤¾à¤œà¤°à¤¾", msp: 2500, unit: "quintal" },
  { id: "jowar", name: "Jowar (Sorghum)", nameHi: "à¤œà¥à¤µà¤¾à¤°", msp: 3180, unit: "quintal" },
  { id: "chana", name: "Chana (Chickpea)", nameHi: "à¤šà¤¨à¤¾", msp: 5440, unit: "quintal" },
];

export function getCropById(cropId) {
  return CROPS.find((c) => c.id === cropId);
}