import Link from "next/link";

const SubmenuItems = ({ submenuItems }: SubmenuItemsProps) => {
  return (
    <div className="absolute left-full -top-32 w-[255px] h-[100vh] px-8 py-6 bg-white transform transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 z-10">
      <h2 className="text-bold text-xl text-black mb-6 text-start">
        {submenuItems.title}
      </h2>
      <div className="ml-4 flex flex-col gap-4 text-sm text-black text-start">
        {submenuItems.items.map((item, index) => (
          <Link
            key={index}
            className="cursor-pointer hover:bg-slate-300 py-2 px-2 rounded-lg"
            href={item.to}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubmenuItems;

interface SubmenuItem {
  title: string;
  to: string;
}

interface SubmenuItems {
  title: string;
  items: SubmenuItem[];
}

interface SubmenuItemsProps {
  submenuItems: SubmenuItems;
}
