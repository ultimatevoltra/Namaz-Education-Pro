export const SalahSteps = [
  "Niyyah",
  "Takbir",
  "Qiyam",
  "Fatiha",
  "Ruku",
  "Sujood",
  "Tashahhud",
  "Salam"
];

export const Mistakes = [
  {
    id: 1,
    wrong: "Ruku too fast",
    correct: "Slow and steady posture required",
    severity: "high"
  },
  {
    id: 2,
    wrong: "Incomplete Sujood",
    correct: "7 body points must touch ground",
    severity: "critical"
  },
  {
    id: 3,
    wrong: "Not fully standing in Qiyam",
    correct: "Stand straight with proper posture",
    severity: "high"
  },
  {
    id: 4,
    wrong: "Rushed Tashahhud",
    correct: "Recite slowly and deliberately",
    severity: "medium"
  },
  {
    id: 5,
    wrong: "Lack of Tuma'ninah (calmness)",
    correct: "Each position must be held with calmness",
    severity: "critical"
  }
];

export function validateSalah(salahData) {
  const errors = [];
  
  if (!salahData.niyyah) errors.push("Niyyah (intention) is required");
  if (!salahData.takbir) errors.push("Takbir (opening) is required");
  if (!salahData.hasRuku) errors.push("Ruku is required");
  if (!salahData.hasSujood) errors.push("Sujood is required");
  
  return errors;
}
