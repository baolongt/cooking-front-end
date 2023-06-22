import React from 'react';
import { posts } from '../../mock-data/index.js';
import Main from '../blogs/Main.js';
const AppContent = () => {
  return (
    <>
      <Main title="Công thức nấu ăn" posts={posts} />
    </>
  );
};

export default AppContent;
