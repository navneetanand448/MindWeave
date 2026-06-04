import React from 'react';
import { NewButton } from './new-button';
import { OrgList } from './list';

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 z-1 flex h-full w-60px flex-col gap-y-4 bg-blue-950 p-3 text-white">
      <OrgList />
      <NewButton />
    </aside>
  );
};

export default Sidebar;