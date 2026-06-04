import React from 'react';
import SideBar from './_components/sidebar';
import OrgSidebar from './_components/org-sidebar';
import Navbar from './_components/navbar';

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashBoardLayoutProps) {
  return (
    <main className="h-full flex">
      <SideBar />
      <div className="pl-60px h-full flex w-full">
        <div className="hidden lg:flex w-64 h-full border-r">
          <OrgSidebar />
        </div>
        <div className="flex-1 h-full flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}