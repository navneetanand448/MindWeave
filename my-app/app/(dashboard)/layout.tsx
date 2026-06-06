import React from 'react';
import SideBar from './_components/sidebar';
import OrgSidebar from './_components/org-sidebar';
import Navbar from './_components/navbar';

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashBoardLayoutProps) {
  return (
    <main className="flex h-full">
      <SideBar />
      <div className="flex h-full w-full pl-60px">
        <div className="hidden h-full w-64 border-r lg:flex">
          <OrgSidebar />
        </div>
        <div className="flex h-full flex-1 flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}