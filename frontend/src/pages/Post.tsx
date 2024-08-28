import { useParams } from "react-router-dom";
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
  MdOutlineModeComment,
  MdOutlineShare,
} from "react-icons/md";

export function Post() {
  const { id } = useParams();
  const post = mockedPosts.find((p) => String(p.id) === id) || mockedPosts[0];
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
          </header>
          <div>
            <span className="text-amber-100 font-semibold text-sm">
              {post.category.name}
            </span>
            <Heading size="xs" asChild>
              <h2 className="tracking-wider">{post.title}</h2>
            </Heading>
          </div>
          <Markdown className="font-light">{post.content}</Markdown>
          <div className="flex space-x-3">
            <Button color="secondary" size="sm">
              <MdArrowUpward className="size-5 mr-2" />
              23
            </Button>
            <Button color="secondary" size="sm">
              <MdOutlineModeComment className="size-5 mr-2" />4
            </Button>
            <Button color="secondary" size="sm">
              <MdOutlineShare className="size-5 mr-2" />
              Share
            </Button>
          </div>
        </Card>
        <Text>{post.comments?.length || 0} comment(s)</Text>
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
            <ul className="flex flex-wrap space-x-3">
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
