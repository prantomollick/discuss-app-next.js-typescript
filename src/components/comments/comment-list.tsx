import { CommentsWithUser } from "@/db/queries/comments";
import CommentShow from "./comment-show";

interface CommentListProps {
  fetchData: () => Promise<CommentsWithUser[]>;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({ fetchData }: CommentListProps) {
  const comments = await fetchData();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
