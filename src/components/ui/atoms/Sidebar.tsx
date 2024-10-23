import SidebarList from "./SidebarList";

const Sidebar = () => {
  return (
    <div className="h-[100vh] bg-primary-500 w-[90px] flex flex-col flex-wrap text-white py-6 gap-6 relative ">
      <SidebarList />
    </div>
  );
};

export default Sidebar;
