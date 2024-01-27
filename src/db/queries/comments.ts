import type { Comment } from "@prisma/client";
import { prisma } from "@/db";

export type CommentsWithUser = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentByPostId(
  postId: string
): Promise<CommentsWithUser[]> {
  return prisma.comment.findMany({
    where: { postId },
    include: {
      user: { select: { name: true, image: true } }
    }
  });
}
