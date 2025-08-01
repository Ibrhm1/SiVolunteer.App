import { CiGrid41, CiWallet } from "react-icons/ci";
import { FaHashtag } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdEvent, MdOutlineVolunteerActivism } from "react-icons/md";

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "myProfile",
    label: "My Profile",
    href: "/member/profile",
    icon: <CiWallet />,
  },
];

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    key: "events",
    label: "Events",
    href: "/admin/events",
    icon: <MdEvent />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <FaHashtag />,
  },
  {
    key: "organizer",
    label: "Organizers",
    href: "/admin/organizers",
    icon: <HiOutlineUserGroup />,
  },
  {
    key: "eventVolunteer",
    label: "Event Volunteer",
    href: "/admin/eventVolunteer",
    icon: <MdOutlineVolunteerActivism />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
