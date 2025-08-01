import { ReactNode, useState } from "react";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import TitlePage from "@/components/common/TitlePage";
import LayoutSidebar from "./LayoutSidebar";
import {
  SIDEBAR_ADMIN,
  SIDEBAR_MEMBER,
} from "./LayoutSidebar/LayoutSidebar.constant";
import ToggleDarkmode from "@/components/UI/ToggleDarkmode";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title: string;
  type?: string;
}

const LayoutDashboard = (props: PropTypes) => {
  const { children, description, title, type = "admin" } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TitlePage title={title} />
      <main className="max-w-screen-3xl 3xl:container flex">
        <LayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            classNames={{ wrapper: "p-0" }}
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <ToggleDarkmode />
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="text-small mb-3">{description}</p>
          {children}
        </div>
      </main>
    </>
  );
};

export default LayoutDashboard;
