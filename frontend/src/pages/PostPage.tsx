import { useParams } from "react-router-dom";
import { Content } from "../components/layout/Content";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { Card } from "../components/ui/Card";
import { Tag } from "../components/ui/Tag";
import { Heading } from "../components/ui/Heading";
import { GoBack } from "../components/ui/GoBack";
import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import { Post } from "../models/Post";
import { postService } from "../services/postService";
import { AxiosError } from "axios";
import { TOAST_MESSAGES } from "../constants/toastMessages";
import { ContentSkeleton } from "../components/shared/skeletons/ContentSkeleton";
import { PostNotFound } from "../components/shared/fallbacks/PostNotFound";
import { PostContent } from "../containers/PostContent";
import { CommentsProvider } from "../containers/comments/contexts/CommentsContext";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";

export function PostPage() {
  const { launchToast } = useToast();
  const { id } = useParams();
  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoadingPost(true);
    postService
      .getById(id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error: AxiosError) => {
        if (error.status !== 404) {
          launchToast({
            color: "danger",
            title: TOAST_MESSAGES.common.unexpectedErrorTitle,
            description: TOAST_MESSAGES.common.unexpectedErrorDescription,
          });
        }
      })
      .finally(() => setLoadingPost(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loadingPost) return <ContentSkeleton />;
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
