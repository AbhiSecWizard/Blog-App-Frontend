import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { PiNotePencilLight } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import { LiaCommentDots } from "react-icons/lia";

const linkClass =
  "flex items-center gap-3 py-3.5 px-6 cursor-pointer";

const activeClass = "bg-primary/10 border-r-4 border-primary";

const Sidebar = ({ onLinkClick }) => {
  return (
    <div className="pt-6">
      <NavLink
        end
        to="/admin"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        <IoHomeOutline size={22} />
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/addblog"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        <PiNotePencilLight size={22} />
        Add Blog
      </NavLink>

      <NavLink
        to="/admin/listblog"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        <CiViewList size={22} />
        Blog List
      </NavLink>

      <NavLink
        to="/admin/comment"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        <LiaCommentDots size={22} />
        Comment
      </NavLink>
    </div>
  );
};

export default Sidebar;