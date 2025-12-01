import React from 'react';

const MainContent = ({ isSidebarExpanded,page }) => {
  return (
    <div className={`main-content ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        {page}
    </div>
  );
};

export default MainContent;