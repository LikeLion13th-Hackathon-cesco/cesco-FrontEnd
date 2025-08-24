export interface PostResponse {
  postId: number;
  content: string;
  likeCount: number;
  commentCount: number;
  userId: number;
  createdAt: string;
  modifiedAt: string;
}
