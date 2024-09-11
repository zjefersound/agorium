import { useParams } from "react-router-dom";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { Card } from "../components/ui/Card";
import { Text } from "../components/ui/Text";
import { Tag } from "../components/ui/Tag";
import { Heading } from "../components/ui/Heading";
import { CommentCard } from "../components/shared/CommentCard";
import { GoBack } from "../components/ui/GoBack";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "../hooks/useToast";
import { Empty } from "../components/ui/Empty";
import { Post } from "../models/Post";
import { postService } from "../services/postService";
import { AxiosError } from "axios";
import { TOAST_MESSAGES } from "../constants/toastMessages";
import { ContentSkeleton } from "../components/shared/skeletons/ContentSkeleton";
import { PostNotFound } from "../components/shared/fallbacks/PostNotFound";
import { CommentEditor } from "../components/shared/CommentEditor";
import { Comment } from "../models/Comment";
import { CommentPayload, commentService } from "../services/commentService";
import { PostContent } from "../containers/PostContent";

export function PostPage() {
  const { launchToast } = useToast();
  const { user } = useAuth();
  const { id } = useParams();
  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  const isAuthor = useMemo(() => user!.id === post?.user.id, [user, post]);

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

  const [commentToReply, setCommentToReply] = useState<null | Comment>(null);
  const handleCreateComment = useCallback(
    async (content: string) => {
      if (!post) return;
      const payload: CommentPayload = {
        content,
      };
      if (commentToReply) {
        payload.parentCommentId = commentToReply.id;
      }

      return commentService.create(post.id, payload);
    },
    [commentToReply, post],
  );

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
        <span id="comments-count" className="block">
          {post.comments?.length || 0} comment(s)
        </span>
        <CommentEditor
          comment={commentToReply}
          onRemoveComment={() => setCommentToReply(null)}
          onSubmit={handleCreateComment}
        />
        {!post.comments?.length && (
          <Empty>
            <p className="to-amber-100 font-bold mb-3 text-center">
              No comments were found
            </p>
            <Text asChild>
              <span className="text-center">
                Be the first to share your thoughts
              </span>
            </Text>
          </Empty>
        )}
        {mockedPosts[0].comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            favorite={comment.id === post.favoriteCommentId}
            comment={comment}
            isPostAuthor={isAuthor}
            onReply={setCommentToReply}
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
