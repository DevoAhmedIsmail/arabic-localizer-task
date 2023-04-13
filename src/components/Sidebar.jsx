import React from "react";
import { MdDashboard } from "react-icons/md";
import { CgScreen } from "react-icons/cg";
import { BsFillCupFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { FaHands } from "react-icons/fa";
import Badge from "./Badge";

const sidebarLinks = [
  {
    href: "/",
    text: "Dashboard",
    icon: <MdDashboard className="text-3xl" />,
    isActive: false,
    badge: 0,
  },
  {
    href: "/",
    text: "Workplace",
    icon: <CgScreen className="text-3xl" />,
    isActive: false,
    badge: 0,
  },
  {
    href: "/",
    text: "Holidays",
    icon: <BsFillCupFill className="text-3xl" />,
    isActive: false,
    badge: 0,
  },
  {
    href: "/",
    text: "Employees",
    icon: <HiUsers className="text-3xl" />,
    isActive: true,
    badge: 5,
  },
  {
    href: "/",
    text: "inbound requests",
    icon: <FaHands className="text-3xl" />,
    isActive: false,
    badge: 0,
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="pt-[50px]">
        {sidebarLinks.map((sidebarLink, index) => (
          <li key={index}>
            <a
              href={sidebarLink.href}
              className={`flex justify-center items-center flex-col text-white relative ${
                sidebarLink.isActive
                  ? "bg-[#2765ac] border-l-4 border-[#59c203]"
                  : ""
              }`}
            >
              {sidebarLink.icon}
              <p className="link-text">{sidebarLink.text}</p>
              {sidebarLink.badge > 0 && (
                <Badge color="#ff6a6a" text={sidebarLink.badge} top="23px" right="32px" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
