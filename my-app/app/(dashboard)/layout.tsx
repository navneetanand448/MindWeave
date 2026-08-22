import React from 'react';
import Navbar from './_components/navbar';
import OrgSidebar from './_components/org-sidebar';
import SideBar from './_components/sidebar';

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashBoardLayoutProps) {
  return (
    <main className="flex h-full min-w-0">
      <SideBar />
      <div className="flex h-full min-w-0 w-full pl-[60px]">
        <div className="hidden h-full w-[206px] shrink-0 border-r lg:flex">
          <OrgSidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}