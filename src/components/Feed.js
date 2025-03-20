import React, { useEffect, useState } from 'react';
import { getUsers, getPostsByUser  } from '../api';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const users = await getUsers();
      const allPosts = [];

      // Fetch posts for each user
      await Promise.all(
        Object.keys(users).map(async (userId) => {
          const userPosts = await getPostsByUser (userId);
          allPosts.push(...userPosts);
        })
      );

      // Sort posts by ID to display the newest first
      allPosts.sort((a, b) => b.id - a.id);
      setPosts(allPosts);
    };

    fetchPosts();

    // Set up an interval to fetch new posts every 10 seconds
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;