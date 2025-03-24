import {  ChevronRight, ChevronUp } from "lucide-react";
import useToggle from "../../hooks/useToggle";

interface Link {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: Link[];
}

const SidebarItem = ({ link }: { link: Link }) => {
  const [open, setIsOpen] = useToggle({ defaultValue: false });

  const handleOpen = () => {
    setIsOpen(!open);
  };
  const hasChildren = link.children && link.children.length > 0;

  return (
    <div>
     
        {hasChildren ? (
          <>
            {/* parant link dropdown */}
            <button
              onClick={handleOpen}
              className="flex items-center gap-2 p-[6px] my-1 w-full text-left hover:bg-subSurface cursor-pointer rounded  relative text-font"
            >
              <link.icon className="w-4 h-4" />
              <span className="  font-merriweather">{link.label}</span>
              <span className="absolute right-0 p-1"> {open ? <ChevronRight className="w-4 h-4"/> : <ChevronUp className="w-4 h-4"/>} </span>
            </button>

            {/* nested links */}
            {open && (
              <div className="pl-5">
                {link.children?.map((child:any, index:any) => (
                  <button key={index} className="flex items-center gap-2 p-2 w-full text-left hover:bg-subSurface cursor-pointer rounded">
                    <child.icon className="w-4 h-4 text-font" />
                    <span className="text-font font-merriweather">{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full items-center gap-2 p-2 rounded  cursor-pointer">
            <link.icon className="w-4 h-4 text-font" />
            <span className="hover:bg-subSurface font-merriweather">{link.label}</span>
          </div>
        )}
     
    </div>
  );
};

export default SidebarItem;
