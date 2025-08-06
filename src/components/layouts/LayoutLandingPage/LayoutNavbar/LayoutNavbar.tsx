import ToggleDarkmode from "@/components/UI/ToggleDarkmode";
import {
  Avatar,
  Button,
  ButtonProps,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useLayoutNavbar from "./useLayoutNavbar.";
import { IoMdSearch } from "react-icons/io";
import { BUTTON_ITEMS, NAV_LINKS } from "../LayoutLandingPage.constant";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LayoutNavbar = () => {
  const session = useSession();
  const router = useRouter();
  const {
    dataProfile,
    isPendingDataProfile,
    isSuccessDataProfile,
    refetchProfile,
  } = useLayoutNavbar();

  useEffect(() => {
    if (router.isReady && session.status === "authenticated") {
      refetchProfile();
    }
  }, [session.status, router.isReady]);

  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <NavbarContent justify="start">
        <NavbarBrand>
          <h1 className="text-3xl font-bold">SiVolunteer</h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden lg:flex">
        {NAV_LINKS.map((item, i) => (
          <NavbarItem
            key={`nav-${item.label}-${i}`}
            as={Link}
            href={item.href}
            className={cn(
              "text-foreground-500 hover:text-foreground font-semibold",
              {
                "text-primary font-bold": router.pathname === item.href,
              },
            )}
          >
            {item.label}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden items-center gap-4 lg:flex">
          {session.status === "authenticated" && (
            <>
              <Input
                className="w-1/2"
                placeholder="Search events"
                startContent={<IoMdSearch size={20} />}
              />
              <Dropdown>
                <DropdownTrigger>
                  <Skeleton
                    className="rounded-full"
                    isLoaded={!isPendingDataProfile}
                  >
                    {dataProfile?.role === "organizer" ? (
                      <Avatar src={dataProfile?.logo} size="md" alt="avatar" />
                    ) : (
                      <Avatar
                        src={dataProfile?.profilePicture}
                        size="md"
                        alt="avatar"
                      />
                    )}
                  </Skeleton>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection showDivider>
                    <DropdownItem key={"Profile"}>
                      {dataProfile?.role === "organizer" ? (
                        <p className="font-semibold">
                          {dataProfile?.organizerName}
                        </p>
                      ) : (
                        <p className="font-semibold">{dataProfile?.username}</p>
                      )}
                      <p className="font-semibold">{dataProfile?.email}</p>
                    </DropdownItem>
                    <DropdownItem
                      key={"dashboard"}
                      href={`/${dataProfile?.role}/dashboard`}
                    >
                      Dashboard
                    </DropdownItem>
                    <DropdownItem
                      key={"profile"}
                      href={`/${dataProfile?.role}/profile`}
                    >
                      Profile
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownItem
                    key={"Logout"}
                    color="danger"
                    variant="flat"
                    onClick={() => signOut()}
                    className="text-danger"
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
          <ToggleDarkmode />
          {session.status === "unauthenticated" &&
            BUTTON_ITEMS.map((item) => (
              <Button
                key={item.label}
                as={Link}
                href={item.href}
                color={item.color as ButtonProps["color"]}
                variant={item.variant as ButtonProps["variant"]}
              >
                {item.label}
              </Button>
            ))}
        </NavbarItem>
        <div className="lg:hidden">
          <ToggleDarkmode />
        </div>
        <Divider orientation="vertical" className="h-10 lg:hidden" />
        <NavbarMenuToggle className="lg:hidden" />
        <NavbarMenu className="gap-4">
          {NAV_LINKS.map((item, i) => (
            <NavbarMenuItem
              key={`nav-${item.label}-${i}`}
              className={cn(
                "text-foreground-500 hover:text-foreground font-semibold",
                {
                  "text-primary font-bold": router.pathname === item.href,
                },
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <>
              <NavbarMenuItem className="text-foreground-500 hover:text-foreground font-semibold">
                <Link href={`/${dataProfile?.role}/dashboard`}>Dashboard</Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="text-foreground-500 hover:text-foreground font-semibold">
                <Link href={`/${dataProfile?.role}/profile`}>Profile</Link>
              </NavbarMenuItem>
              <NavbarMenuItem
                onClick={() => signOut()}
                className="text-danger font-semibold"
              >
                Logout
              </NavbarMenuItem>
            </>
          ) : (
            <>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem
                  key={item.label}
                  className="hover:text-foreground font-semibold"
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavbarMenuItem>
              ))}
            </>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LayoutNavbar;
