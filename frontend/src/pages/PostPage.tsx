import { useParams } from "react-router-dom";
import { Content } from "../components/layout/Content";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { Card } from "../components/ui/Card";
import { Tag } from "../components/ui/Tag";
import { Heading } from "../components/ui/Heading";
import { GoBack } from "../components/ui/GoBack";
import { useEffect } from "react";
import { ContentSkeleton } from "../components/shared/skeletons/ContentSkeleton";
import { PostNotFound } from "../components/shared/fallbacks/PostNotFound";
import { PostContent } from "../containers/PostContent";
import { CommentsProvider } from "../containers/comments/contexts/CommentsContext";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { useResource } from "../hooks/useResource";

export function PostPage() {
  const { id } = useParams();
  const { postResource } = useResource();
  const post = postResource.data;
  useEffect(() => {
    if (!id) return;
    postResource.fetchData(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (postResource.loading && !post) return <ContentSkeleton />;
  if (!post) return <PostNotFound />;
  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <GoBack to="/" />
        <PostContent post={post} />
        <CommentsProvider post={post} />
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
