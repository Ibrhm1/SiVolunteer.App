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
    key: "transaction",
    label: "Transaction",
    href: "/member/transaction",
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
    label: "Event",
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
    label: "Organizer",
    href: "/admin/organizer",
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
