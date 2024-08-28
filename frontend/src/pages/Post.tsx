import { Link, useParams } from "react-router-dom";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { formatDistance } from "date-fns";
import { Text } from "../components/ui/Text";
import { Tag } from "../components/ui/Tag";
import { Heading } from "../components/ui/Heading";
import Markdown from "react-markdown";
import { Button } from "../components/ui/Button";
import {
  MdArrowUpward,
  MdOutlineEdit,
  MdOutlineModeComment,
  MdOutlineShare,
} from "react-icons/md";
import { CommentCard } from "../components/shared/CommentCard";
import { GoBack } from "../components/ui/GoBack";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useMemo } from "react";
import { useToast } from "../hooks/useToast";

export function Post() {
  const { launchToast } = useToast();
  const { user } = useAuth();
  const { id } = useParams();
  const post = mockedPosts.find((p) => String(p.id) === id) || mockedPosts[0];

  const isAuthor = useMemo(() => user!.id === post.user.id, [user, post]);
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
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
        <PopularItemCard
          title="Popular tags"
          path="/tags"
          items={[
            { id: 1, label: "#biology", totalPosts: 53 },
            { id: 7, label: "#math", totalPosts: 43 },
            { id: 8, label: "#science", totalPosts: 41 },
            { id: 9, label: "#englsih", totalPosts: 31 },
            { id: 10, label: "#history", totalPosts: 12 },
          ]}
        />
        <PopularItemCard
          title="Popular categories"
          path="/categories"
          items={[
            { id: 2, label: "Issue", totalPosts: 286 },
            { id: 3, label: "Discussion", totalPosts: 233 },
            { id: 4, label: "Feedback", totalPosts: 211 },
            { id: 5, label: "Debate", totalPosts: 173 },
            { id: 6, label: "Tutorials", totalPosts: 163 },
          ]}
        />
      </Content.Sidebar>
      <Content.Main>
        <GoBack to="/" />
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
          </div>
          <Markdown className="leading-7 text-sm">{post.content}</Markdown>
          <div className="flex space-x-3">
            <Button color={post.voted ? "primary" : "secondary"} size="sm">
              <MdArrowUpward className="size-5 mr-2" />
              {post.totalUpvotes}
            </Button>
            <Button color="secondary" size="sm">
              <MdOutlineModeComment className="size-5 mr-2" />
              {post.comments?.length || 0}
            </Button>
            <Button color="secondary" size="sm" onClick={handleShare}>
              <MdOutlineShare className="size-5 mr-2" />
              Share
            </Button>
          </div>
        </Card>
        <span id="comments-count" className="block">
          {post.comments?.length || 0} comment(s)
        </span>
        {post.comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            accepted={comment.id === post.acceptedCommentId}
            comment={comment}
            isPostAuthor={isAuthor}
          />
        ))}
      </Content.Main>
      <Content.Sidebar>
        <SimpleUserCard
          name={post.user.fullName}
          rankingPosition={12}
          totalPosts={32}
          totalUpvotes={642123}
          username={post.user.username}
          url={post.user.avatar}
        />
        {post.tags?.length && (
          <Card>
            <Heading size="xs" asChild>
              <h2 className="tracking-wider">Featured tags</h2>
            </Heading>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 mt-6">
              {post.tags.map((tag) => (
                <li key={tag.id}>
                  <Tag>{tag.name}</Tag>
                </li>
              ))}
            </ul>
          </Card>
        )}
        <TrendingPosts
          posts={[mockedPosts[0], mockedPosts[1], mockedPosts[2]]}
        />
      </Content.Sidebar>
    </Content.Root>
  );
}
