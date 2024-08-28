import { MdArrowUpward, MdOutlineModeComment } from "react-icons/md";
import { Post } from "../../models/Post";
import { Avatar } from "../ui/Avatar";
import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";
import { formatDistance } from "date-fns";
import { Text } from "../ui/Text";
import { Link } from "react-router-dom";
interface TrendingPostsProps {
  posts: Post[];
}
export function TrendingPosts({ posts }: TrendingPostsProps) {
  return (
    <Card>
      <Heading size="xs" asChild>
        <h2 className="tracking-wider">Trending posts</h2>
      </Heading>
      <ul className="mt-6 space-y-6">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <div className="-my-2 py-2 rounded -mx-2 px-2 hover:bg-agorium-700">
                <div className="flex items-center">
                  <Avatar
                    name={post.user.fullName}
                    url={post.user.avatar}
                    size="xs"
                  />
                  <span className="text-xs text-agorium-400 font-bold ml-2 tracking-wider">
                    {post.user.fullName}
                  </span>
                  <span className="text-xs text-agorium-400 ml-auto tracking-wider">
                    {formatDistance(new Date(post.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-agorium-50 text-sm mt-2 tracking-wider font-semibold">
                  {post.title}
                </p>
                <div className="flex space-x-3 mt-2">
                  <span className="text-xs text-amber-100 tracking-wider font-bold mr-auto truncate">
                    {post.category.name}
                  </span>
                  <Text asChild>
                    <span className="flex items-center">
                      {post.tags?.length || 0} tags
                    </span>
                  </Text>
                  <Text asChild>
                    <span className="flex items-center">
                      <MdOutlineModeComment className="mr-1" />{" "}
                      {post.comments?.length || 0}
                    </span>
                  </Text>
                  <Text asChild>
                    <span className="flex items-center">
                      <MdArrowUpward className="mr-1" /> {post.totalUpvotes}
                    </span>
                  </Text>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
