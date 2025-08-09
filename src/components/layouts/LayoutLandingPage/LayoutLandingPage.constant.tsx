import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "#",
  },
  {
    label: "Explore Events",
    href: "/events",
  },
  {
    label: "Explore Organizers",
    href: "#",
  },
];

const BUTTON_ITEMS = [
  {
    label: "Login",
    href: "/auth/login",
    color: "primary",
    variant: "ghost",
  },
  {
    label: "Register",
    href: "/auth/register",
    color: "primary",
    variant: "flat",
  },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FaFacebook />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/iibibrhm/",
    icon: <FaInstagram />,
  },
  {
    label: "Github",
    href: "https://github.com/Ibrhm1",
    icon: <FaGithub />,
  },
];

export { NAV_LINKS, BUTTON_ITEMS, SOCIAL_ITEMS };
