import { ChevronRight, ChevronUp } from "lucide-react";
import useToggle from "../../hooks/useToggle";
import { Link } from "react-router-dom";


interface Link {
  path: string,
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
         <Link to={link.path}>
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
          </Link>
          {/* nested links */}
          {open && (
            <div className="pl-4">
              {link.children?.map((child: any, index: any) => (
              <Link to={child.path}>
                <button
                  key={index}
                  className="sidebarBtn"
                >
                  <child.icon className="w-4 h-4" />
                  <span className="font-semibold font-merriweather">{child.label}</span>
                </button>
            </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link to={link.path}>
        <div className="sidebarBtn">
          <link.icon className="w-4 h-4 " />
          <span className="font-semibold font-merriweather">{link.label}</span>
        </div>
        </Link>
      )}
    </div>
  );
};

export default SidebarItem;
