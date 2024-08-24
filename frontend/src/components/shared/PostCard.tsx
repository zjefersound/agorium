import { Link } from "react-router-dom";
import { Post } from "../../models/Post";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { Avatar } from "../ui/Avatar";
import { formatDistance } from "date-fns";
import { Text } from "../ui/Text";
import { MdArrowUpward, MdOutlineModeComment } from "react-icons/md";
import Markdown from "react-markdown";

interface PostCardProps {
  post: Post;
}
export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/post/${post.id}`}>
      <Card className="space-y-4">
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
        </header>
        <div className="space-y-2">
          <p className="font-bold tracking-wider">{post.title}</p>
          <p className="font-light text-sm line-clamp-2">
            <Markdown>{post.content}</Markdown>
          </p>
        </div>
        <footer className="flex items-center">
          <span className="text-amber-100 font-semibold text-sm">
            {post.category.name}
          </span>
          <ul className="flex space-x-3 ml-3">
            {post.tags?.map((tag) => (
              <li key={tag.id}>
                <Tag>{tag.name}</Tag>
              </li>
            ))}
          </ul>
          <Text asChild>
            <span className="flex items-center ml-auto">
              <MdOutlineModeComment className="mr-1 size-4" />{" "}
              {post.comments?.length || 0}
            </span>
          </Text>
          <Text asChild>
            <span className="flex items-center ml-4">
              <MdArrowUpward className="mr-1 size-4" />{" "}
              {post.upvotes?.length || 0}
            </span>
          </Text>
        </footer>
      </Card>
    </Link>
  );
}
