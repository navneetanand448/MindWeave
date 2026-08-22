import { OrgList } from './list';
import { NewButton } from './new-button';

export const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-[60px] flex-col gap-y-4 bg-blue-950 p-3 text-white">
      <OrgList />
      <NewButton />
    </aside>
  );
};

export default Sidebar;