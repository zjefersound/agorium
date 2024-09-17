import { Comment } from "../../models/Comment";
import { Card } from "../ui/Card";
import { MarkdownPreview } from "../ui/MarkdownPreview";
import { Text } from "../ui/Text";
import { AuthorOverview } from "./AuthorOverview";

export function ChildCommentCard({ comment }: { comment: Comment }) {
  return (
    <Card key={comment.id} className="mt-3 space-y-2">
      <div>
        <Text>
          Replying to{" "}
          <span className="font-semibold">@{comment.user!.username}</span>{" "}
        </Text>
      </div>

      <AuthorOverview
        date={comment.createdAt}
        name={comment.user!.fullName}
        username={comment.user!.username}
        avatar={comment.user!.avatar}
      />
      <MarkdownPreview>{comment.content}</MarkdownPreview>
    </Card>
  );
}
