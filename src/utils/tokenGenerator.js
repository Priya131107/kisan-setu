const STATE_CODES = {
  rajasthan: "RJ",
  haryana: "HR",
  punjab: "PB",
};

let counter = 100;

export function generateToken(state) {
  const stateCode = STATE_CODES[state.toLowerCase()] || "XX";
  const year = new Date().getFullYear();
  counter++;
  const num = String(counter).padStart(5, "0");
  return `${stateCode}-${year}-${num}`;
}

export function generateFarmerId(state) {
  const stateCode = STATE_CODES[state.toLowerCase()] || "XX";
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `F-${stateCode}-${rand}`;
}

export function generateRegistrationId(state) {
  const stateCode = STATE_CODES[state?.toLowerCase()] || "XX";
  const year = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 90000) + 10000).padStart(5, "0");
  return `KS-${stateCode}-${year}-${rand}`;
}