interface Reply {
  commentId: number;
  content: string;
  createdAt: string;
  postId: number;
  updatedAt: string;
  userId: number;
}

export type ReplyResponse = Reply[];
