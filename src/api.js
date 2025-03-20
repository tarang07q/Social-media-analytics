const BASE_URL = 'http://20.244.56.144/test';

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
};

export const getPostsByUser  = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/posts`);
  return response.json();
};

export const getCommentsByPost = async (postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  return response.json();
};