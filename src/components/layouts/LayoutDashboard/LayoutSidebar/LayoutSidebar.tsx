import { publicImage } from "@/components/images/render.image";
import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { BiLogOut } from "react-icons/bi";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const LayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();

  return (
    <div
      className={cn(
        "border-default-200 bg-default-50 fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col border-r-1 px-4 py-6 transition-all lg:relative lg:translate-x-0",
        {
          "translate-x-0": isOpen,
        },
      )}
    >
      <div>
        <Link
          href="/"
          className="bg-default-100 mb-3 shadow-default-400 flex justify-center rounded-2xl shadow"
        >
          <Image src={publicImage.Logo} alt="logo" width={100} height={100} />
        </Link>
        <Listbox
          variant="faded"
          color="default"
          items={sidebarItems}
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              as={Link}
              key={item.key}
              href={item.href}
              startContent={item.icon}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              aria-label="Dashboard Menu Item"
              className={cn("my-1 h-10 text-2xl", {
                "bg-default-300": router.pathname.startsWith(item.href),
              })}
            >
              <p className="font-semibold">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="mt-10 flex items-center p-1">
        <Button
          size="md"
          fullWidth
          color="danger"
          variant="light"
          onPress={() => signOut()}
          className="flex justify-start rounded-lg px-2 py-1.5 font-semibold"
        >
          <BiLogOut className="text-medium font-bold" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LayoutSidebar;
