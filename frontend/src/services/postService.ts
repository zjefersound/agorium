import { mockedPosts } from "../examples/mocks/mocks";

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

export const postService = {
  getById,
};
