import { ChevronRight, ChevronUp } from "lucide-react";
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
            className="sidebarBtn my-1 relative"
          >
            <link.icon className="w-4 h-4" />
            <span className="font-semibold font-merriweather">{link.label}</span>
            <span className="absolute right-0 p-1">
              {" "}
              {open ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}{" "}
            </span>
          </button>

          {/* nested links */}
          {open && (
            <div className="pl-4">
              {link.children?.map((child: any, index: any) => (
                <button
                  key={index}
                  className="sidebarBtn"
                >
                  <child.icon className="w-4 h-4" />
                  <span className="font-semibold font-merriweather">{child.label}</span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="sidebarBtn">
          <link.icon className="w-4 h-4 " />
          <span className="font-semibold font-merriweather">{link.label}</span>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
