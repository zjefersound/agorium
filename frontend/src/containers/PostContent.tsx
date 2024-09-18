import { formatDistance } from "date-fns";
import { Avatar } from "../components/ui/Avatar";
import { Card } from "../components/ui/Card";
import { Text } from "../components/ui/Text";
import { Post } from "../models/Post";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  MdArrowUpward,
  MdOutlineEdit,
  MdOutlineModeComment,
  MdOutlineShare,
} from "react-icons/md";
import { Heading } from "../components/ui/Heading";
import { MarkdownPreview } from "../components/ui/MarkdownPreview";
import { memo, useCallback, useMemo } from "react";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";
import { Tag } from "../components/ui/Tag";

interface PostContentProps {
  post: Post;
}
function PostContent({ post }: PostContentProps) {
  const { user } = useAuth();
  const isAuthor = useMemo(() => user!.id === post?.user.id, [user, post]);
  const { launchToast } = useToast();
  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    launchToast({
      color: "info",
      title: "Copied to clipboard",
      description: `Copied post link to your clipboard`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="space-y-6">
      <header className="flex">
        <Avatar name={post.user.fullName} url={post.user.avatar} />
        <div className="flex flex-col ml-4">
          <span>{post.user.username}</span>
          <Text size="sm" asChild>
            <span className="tracking-wider">
              {formatDistance(new Date(post.createdAt), new Date(), {
                addSuffix: true,
              })}
            </span>
          </Text>
        </div>
        {isAuthor && (
          <Link to={`/post/${post.id}/edit`} className="ml-auto">
            <Button color="secondary" size="sm">
              <MdOutlineEdit className="size-5 mr-2" />
              Edit
            </Button>
          </Link>
        )}
      </header>
      <div>
        <span className="text-amber-100 font-semibold text-sm">
          {post.category.name}
        </span>
        <Heading size="xs" asChild>
          <h2 className="tracking-wider">{post.title}</h2>
        </Heading>
        <ul className="flex flex-wrap gap-x-3 gap-y-2 mt-2 md:hidden">
          {post.tags?.map((tag) => (
            <li key={tag.id}>
              <Tag>{tag.name}</Tag>
            </li>
          ))}
        </ul>
      </div>
      <MarkdownPreview>{post.content}</MarkdownPreview>
      <div className="flex space-x-3">
        <Button color={post.voted ? "primary" : "secondary"} size="sm">
          <MdArrowUpward className="size-5 mr-2" />
          {post.totalUpvotes}
        </Button>
        <Button color="secondary" size="sm">
          <MdOutlineModeComment className="size-5 mr-2" />
          {post.comments?.length ?? 0}
        </Button>
        <Button color="secondary" size="sm" onClick={handleShare}>
          <MdOutlineShare className="size-5 mr-2" />
          Share
        </Button>
      </div>
    </Card>
  );
}

const MemoizedPostContent = memo(PostContent);
export { MemoizedPostContent as PostContent };
