import Link from "next/link";
import { NAV_LINKS, SOCIAL_ITEMS } from "../LayoutLandingPage.constant";
import { Divider } from "@heroui/react";
import Image from "next/image";
import { publicImage } from "@/components/images/render.image";

const LayoutFooter = () => {
  return (
    <footer className="bg-default-50 border-foreground-200 border-t-3">
      <div className="w-full p-4 py-6 md:px-8 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 flex flex-col gap-6 md:mb-0 md:flex-row md:items-center">
            <div className="flex flex-col items-center">
              <Image
                src={publicImage.Logo}
                alt="FlowBite Logo"
                width={200}
                height={200}
                className="rounded-lg object-center"
              />
            </div>
            <div className="mt-6 flex flex-col gap-2 md:mt-0 md:w-1/2">
              <Link
                href={"mailto:devcorner22@gmail.com"}
                target="_blank"
                className="text-foreground-500 hover:text-foreground-700 hover:underline"
              >
                devcorner22@gmail.com
              </Link>
              <p className="text-foreground-700">
                123 Main Street, Bekasi, Jawa Barat, Indonesia
              </p>
              <p className="text-foreground-700">+62 812-3456-7890</p>
              <span></span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div className="flex flex-col">
              <h2 className="mb-2 text-2xl font-semibold">Menu</h2>
              {NAV_LINKS.map((menu, i) => (
                <Link
                  key={i}
                  href={menu.href}
                  className="text-foreground-500 mb-2 font-semibold hover:underline"
                >
                  {menu.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Divider className="bg-foreground-400 my-6 sm:mx-auto lg:my-6" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-medium text-gray-500 sm:text-center">
            © 2025{" "}
            <Link
              href="https://si-volunteer-app.vercel.app/"
              className="hover:underline"
            >
              SiVolunteer
            </Link>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex gap-3 sm:mt-0 sm:justify-center">
            {SOCIAL_ITEMS.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="text-3xl opacity-60 hover:opacity-100"
                target="_blank"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
