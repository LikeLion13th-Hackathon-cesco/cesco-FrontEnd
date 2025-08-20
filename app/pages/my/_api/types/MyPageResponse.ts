import type { SafetyType } from "~/types/SafetyType";

export interface MyPageResponse {
  credit: number; // 사용자 보유 크레딧
  postCount: number; // 사용자 작성 게시글 수
  reports: {
    reportId: number;
    address: string;
    safetyScore: number;
    summary: string;
    comment: SafetyType;
  }[]; // 분석레포트 리스트
}
