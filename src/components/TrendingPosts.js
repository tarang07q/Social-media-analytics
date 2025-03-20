import React, { useEffect, useState } from 'react';
import { getPostsByUser , getCommentsByPost } from '../api';
import { getUsers } from '../api';
const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const users = await getUsers();
      const allPosts = [];

      // Fetch posts for each user
      await Promise.all(
        Object.keys(users).map(async (userId) => {
          const posts = await getPostsByUser (userId);
          allPosts.push(...posts);
        })
      );

      // Fetch comments for each post and count them
      const postCommentCounts = await Promise.all(
        allPosts.map(async (post) => {
          const comments = await getCommentsByPost(post.id);
          return { post, commentCount: comments.length };
        })
      );

      // Find the maximum comment count
      const maxCommentCount = Math.max(...postCommentCounts.map(pc => pc.commentCount));
      const trending = postCommentCounts.filter(pc => pc.commentCount === maxCommentCount);

      setTrendingPosts(trending);
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div>
      <h2>Trending Posts</h2>
      <ul>
        {trendingPosts.map(({ post }) => (
          <li key={post.id}>
            {post.content} - Comments: {post.commentCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;