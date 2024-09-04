import { mockedPosts } from "../examples/mocks/mocks";
import { api } from "./api";

async function getById(id: number | string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const post = mockedPosts.find((p) => String(p.id) === id);
  if (!post)
    return Promise.reject({
      status: 404,
    });
  return Promise.resolve({
    data: post,
  });
}

export type CreatePostPayload = {
  title: string;
  content: string;
  categoryId: number;
  tags: string[];
};
function create(data: CreatePostPayload) {
  return api.post("/post", data);
}

export const postService = {
  getById,
  create,
};
