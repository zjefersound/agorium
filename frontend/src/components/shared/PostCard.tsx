import { Link } from "react-router-dom";
import { Post } from "../../models/Post";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { Text } from "../ui/Text";
import { MdArrowUpward, MdOutlineModeComment } from "react-icons/md";
import Markdown from "react-markdown";
import { AuthorOverview } from "./AuthorOverview";
import { memo } from "react";

interface PostCardProps {
  post: Post;
}
function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/post/${post.id}`}>
      <Card className="space-y-4">
        <AuthorOverview
          avatar={post.user.avatar}
          username={post.user.username}
          name={post.user.fullName}
          date={post.createdAt}
        />
        <div className="space-y-2">
          <p className="font-bold tracking-wider">{post.title}</p>
          <Markdown className="font-light text-sm text-agorium-400 line-clamp-2 [&>p>img]:mt-2 [&>p>img]:rounded-md [&>p>img]:max-h-16">
            {post.content.substring(0, 100)}
          </Markdown>
        </div>
        <footer className="flex items-center flex-1">
          <span className="text-amber-100 font-semibold text-sm">
            {post.category.name}
          </span>
          <ul className="flex space-x-3 ml-3 flex-1 overflow-x-auto overflow-y-hidden">
            {post.tags?.map((tag) => (
              <li key={tag.id}>
                <Tag>{tag.name}</Tag>
              </li>
            ))}
          </ul>
          <Text asChild>
            <span className="flex items-center ml-4">
              <MdOutlineModeComment className="mr-1 size-4" />{" "}
              {post.totalComments}
            </span>
          </Text>
          <Text asChild>
            <span className="flex items-center ml-4">
              <MdArrowUpward className="mr-1 size-4" /> {post.totalUpvotes}
            </span>
          </Text>
        </footer>
      </Card>
    </Link>
  );
}

const MemoizedPostCard = memo(PostCard);
export { MemoizedPostCard as PostCard };
