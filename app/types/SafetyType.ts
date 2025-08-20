export const SafetyType = {
  Safe: "SAFE",
  Caution: "CAUTION",
  Dangerous: "DANGEROUS",
} as const;

export type SafetyType = (typeof SafetyType)[keyof typeof SafetyType];
