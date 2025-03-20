import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/top-users">Top Users</Link></li>
            <li><Link to="/trending-posts">Trending Posts</Link></li>
            <li><Link to="/feed">Feed</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/trending-posts" element={<TrendingPosts />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<h1>Welcome to Social Media Analytics</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;