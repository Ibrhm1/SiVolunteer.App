import { CiGrid41 } from "react-icons/ci";
import {
  FaHandHoldingHeart,
  FaHashtag,
  FaQuestion,
  FaUserCog,
  FaUsers,
} from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdEvent, MdOutlineVolunteerActivism } from "react-icons/md";
import { RiAdminFill, RiCalendarEventFill } from "react-icons/ri";

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
  {
    key: "members",
    label: "Members",
    href: "/admin/members",
    icon: <FaUsers />,
  },
  {
    key: "faq",
    label: "Frequently Asked Questions",
    href: "/admin/faqs",
    icon: <FaQuestion />,
  },
  {
    key: "profile",
    label: "Admin Profile",
    href: "/admin/profile",
    icon: <RiAdminFill />,
  },
];

const SIDEBAR_ORGANIZER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/organizer/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    key: "myEvents",
    label: "My Events",
    href: "/organizer/my-events",
    icon: <RiCalendarEventFill />,
  },
  {
    key: "profile",
    label: "My Profile",
    href: "/organizer/profile",
    icon: <FaUsers />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "myParticipation",
    label: "My Participation",
    href: "/member/my-participation",
    icon: <FaHandHoldingHeart />,
  },
  {
    key: "profile",
    label: "My Profile",
    href: "/member/profile",
    icon: <FaUserCog />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER, SIDEBAR_ORGANIZER };
