import React from 'react';
import { sidebar } from '../../mock-data/index.js';
import Sidebar from '../blogs/Sidebar';
const AppInsetSidebar = () => {
  return (
    <>
      <Sidebar
        title={sidebar.title}
        description={sidebar.description}
        links={sidebar.links}
        social={sidebar.social}
      />
    </>
  );
};

export default AppInsetSidebar;
