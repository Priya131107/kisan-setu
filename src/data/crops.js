export const CROPS = [
  { id: "wheat", name: "Wheat", nameHi: "गेहूं", msp: 2275, unit: "quintal" },
  { id: "rice", name: "Rice (Paddy)", nameHi: "चावल (धान)", msp: 2203, unit: "quintal" },
  { id: "mustard", name: "Mustard", nameHi: "सरसों", msp: 5650, unit: "quintal" },
  { id: "barley", name: "Barley", nameHi: "जौ", msp: 1850, unit: "quintal" },
  { id: "maize", name: "Maize", nameHi: "मक्का", msp: 2090, unit: "quintal" },
  { id: "cotton", name: "Cotton", nameHi: "कपास", msp: 7020, unit: "quintal" },
  { id: "sugarcane", name: "Sugarcane", nameHi: "गन्ना", msp: 315, unit: "quintal" },
  { id: "bajra", name: "Bajra (Pearl Millet)", nameHi: "बाजरा", msp: 2500, unit: "quintal" },
  { id: "jowar", name: "Jowar (Sorghum)", nameHi: "ज्वार", msp: 3180, unit: "quintal" },
  { id: "chana", name: "Chana (Chickpea)", nameHi: "चना", msp: 5440, unit: "quintal" },
];

export function getCropById(cropId) {
  return CROPS.find((c) => c.id === cropId);
}