import Image from "next/image";
import Link from "next/link";
import SubmenuItems from "./SubmenuItems";
import Divider from "@atoms/Divider";

const SidebarItem = ({
  src,
  to,
  text,
  submenu,
  submenuItems,
  hasDivider,
}: MenuItem) => {
  return (
    <div className="">
      {hasDivider ? <Divider /> : null}

      <div className="group flex flex-col items-center justify-center relative w-[90px]">
        <div className="flex flex-col items-center justify-center py-3 px-4 text-[0.80rem] font-medium gap-3 hover:bg-primary-600 cursor-pointer ease-in-out transition duration-500 w-full text-center rounded-md">
          <Image src={src} height={25} width={25} alt="home icon" />
          <Link href={to}>{text}</Link>
        </div>
        {submenu && submenuItems && (
          <SubmenuItems submenuItems={submenuItems} />
        )}
      </div>
    </div>
  );
};

export default SidebarItem;

interface SubmenuItem {
  title: string;
  to: string;
}

interface SubmenuItemsData {
  title: string;
  items: SubmenuItem[] | [];
}

interface MenuItem {
  id: number;
  src: string;
  to: string;
  text: string;
  submenu: boolean;
  submenuItems: SubmenuItemsData | null;
  hasDivider: boolean;
}
