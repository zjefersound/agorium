import { useParams } from "react-router-dom";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { Card } from "../components/ui/Card";
import { Tag } from "../components/ui/Tag";
import { Heading } from "../components/ui/Heading";
import { GoBack } from "../components/ui/GoBack";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "../hooks/useToast";
import { Post } from "../models/Post";
import { postService } from "../services/postService";
import { AxiosError } from "axios";
import { TOAST_MESSAGES } from "../constants/toastMessages";
import { ContentSkeleton } from "../components/shared/skeletons/ContentSkeleton";
import { PostNotFound } from "../components/shared/fallbacks/PostNotFound";
import { PostContent } from "../containers/PostContent";
import { PostComments } from "../containers/PostComments";
import { commentService } from "../services/commentService";
import { Comment } from "../models/Comment";
import { PostCommentsSkeleton } from "../components/shared/skeletons/PostCommentsSkeleton";

export function PostPage() {
  const { launchToast } = useToast();
  const { user } = useAuth();
  const { id } = useParams();
  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const isAuthor = useMemo(() => user!.id === post?.user.id, [user, post]);

  const [loadingComments, setLoadingComments] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleFetchComments = useCallback(() => {
    if (!id) return;
    setLoadingComments(true);
    commentService
      .getAll(id)
      .then((res) => {
        console.log(res.data);

        setComments([...res.data]);
      })
      .finally(() => setLoadingComments(false));
  }, [id]);
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
    handleFetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loadingPost) return <ContentSkeleton />;
  if (!post) return <PostNotFound />;
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
        <PostContent post={post} />
        {loadingComments && <PostCommentsSkeleton />}
        <PostComments
          isAuthor={isAuthor}
          postId={post.id}
          comments={comments}
          favoriteCommentId={post.favoriteCommentId}
          onRefreshComments={handleFetchComments}
        />
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
