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
  Image,
  Input,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useLayoutNavbar from "./useLayoutNavbar.";
import { IoMdSearch } from "react-icons/io";
import { BUTTON_ITEMS, NAV_LINKS } from "../LayoutLandingPage.constant";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IEvent } from "@/types/Event";

const LayoutNavbar = () => {
  const session = useSession();
  const router = useRouter();
  const {
    dataProfile,
    isPendingDataProfile,
    refetchProfile,

    search,
    setSearch,
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,

    handleSearch,
  } = useLayoutNavbar();

  useEffect(() => {
    if (router.isReady && session.status === "authenticated") {
      refetchProfile();
    }
  }, [session.status, router.isReady]);

  return (
    <Navbar maxWidth="full" isBordered isBlurred={false}>
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href={"/"} className="text-lg font-bold lg:text-3xl">
            SiVolunteer
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden xl:flex">
        {NAV_LINKS.map((item, i) => (
          <NavbarItem
            key={`nav-${item.label}-${i}`}
            as={Link}
            href={item.href}
            className={cn(
              "text-foreground-500 hover:text-foreground font-semibold",
              {
                "text-primary border-primary hover:text-primary-400 border-b-2 font-bold":
                  router.pathname === item.href,
              },
            )}
          >
            {item.label}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden items-center gap-4 lg:relative lg:flex">
          <Input
            isClearable
            onChange={handleSearch}
            onClear={() => setSearch("")}
            placeholder="Search events"
            startContent={<IoMdSearch size={20} />}
          />
          {search !== "" && (
            <Listbox
              items={dataEventsSearch?.data || []}
              className="bg-default-100 absolute top-12 right-0 rounded-xl"
            >
              {!isRefetchingEventsSearch && !isLoadingEventsSearch ? (
                (item: IEvent) => (
                  <ListboxItem
                    key={`list-${item._id}`}
                    href={`/events/${item.slug}`}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        loading="lazy"
                        src={`${item?.image}`}
                        alt={`${item.name}`}
                        width={200}
                        height={100}
                        className="cursor-pointer rounded-md"
                      />
                      <p className="line-clamp-2 text-wrap">{item.name}</p>
                    </div>
                  </ListboxItem>
                )
              ) : (
                <ListboxItem key="loading" className="bg-default-100">
                  <Spinner
                    color="primary"
                    size="sm"
                    className="w-full text-center"
                  />
                </ListboxItem>
              )}
            </Listbox>
          )}
          {session.status === "authenticated" && (
            <>
              <Dropdown>
                <DropdownTrigger>
                  <Skeleton
                    className="rounded-full"
                    isLoaded={!isPendingDataProfile}
                  >
                    {dataProfile?.role === "organizer" ? (
                      <Avatar
                        src={dataProfile?.logo}
                        size="md"
                        alt="avatar"
                        className="cursor-pointer"
                      />
                    ) : (
                      <Avatar
                        src={dataProfile?.profilePicture}
                        size="md"
                        alt="avatar"
                        className="cursor-pointer"
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
          <div className="hidden xl:block">
            <ToggleDarkmode />
          </div>
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
        <div className="xl:hidden">
          <ToggleDarkmode />
        </div>
        <Divider orientation="vertical" className="h-10 lg:hidden" />
        <NavbarMenuToggle className="xl:hidden" />
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
