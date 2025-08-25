export interface AnalyzeResultResponse {
  reportId: number;
  analysisReportUrl: string;
  address: string;
  safetyScore: number;
  summary: string;
  comment: string;
  safetyDescription: string;
  insuranceDescription: string;
  warning: "WARN" | "DEFAULT";
}
