import { useCallback, useState } from "react";
import { ISearchableOptions } from "../../models/ISearchableOptions";
import { postService } from "../../services/postService";
import { Post } from "../../models/Post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = useCallback((options?: ISearchableOptions) => {
    setLoading(true);
    return postService
      .getAll(options)
      .then((res) => setPosts(res.data.data))
      .catch((error) => console.error("Failed to fetch posts:", error))
      .finally(() => setLoading(false));
  }, []);

  return { posts, fetchPosts, loading };
}
