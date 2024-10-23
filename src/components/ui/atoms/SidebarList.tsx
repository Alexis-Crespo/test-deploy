import SidebarItem from "./SidebarItem";
import menuList from "./../../../constants/menuList";

const SidebarList = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-3 px-4 text-[0.80rem] font-medium gap-3  cursor-pointer ease-in-out transition duration-500 w-[100%] text-center rounded-2xl">
        {menuList.map((item) => {
          return (
            <SidebarItem
              key={item.id}
              id={item.id}
              src={item.src}
              to={item.to}
              text={item.text}
              submenu={item.submenu}
              submenuItems={item.submenuItems}
              hasDivider={item.hasDivider}
            />
          );
        })}
      </div>
    </>
  );
};

export default SidebarList;
