import React, { useEffect, useState } from 'react';
import { getUsers, getPostsByUser  } from '../api';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      const users = await getUsers();
      const userPostCounts = await Promise.all(
        Object.keys(users).map(async (userId) => {
          const posts = await getPostsByUser (userId);
          return { userId, postCount: posts.length };
        })
      );

      userPostCounts.sort((a, b) => b.postCount - a.postCount);
      setTopUsers(userPostCounts.slice(0, 5));
    };

    fetchTopUsers();
  }, []);

  return (
    <div>
      <h2>Top Users</h2>
      <ul>
        {topUsers.map((user) => (
          <li key={user.userId}>
            User ID: {user.userId}, Posts: {user.postCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;