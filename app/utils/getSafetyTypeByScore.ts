import { SafetyType } from "~/types/SafetyType";

const getSafetyTypeByScore = (score: number | null) => {
  if (score === null) return null;

  if (score >= 7) return SafetyType.Safe;
  if (score >= 3) return SafetyType.Caution;
  return SafetyType.Dangerous;
};

export default getSafetyTypeByScore;
