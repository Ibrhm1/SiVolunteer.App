import TitlePage from "@/components/common/TitlePage";
import ToggleDarkmode from "@/components/UI/ToggleDarkmode";
import authService from "@/services/auth.service";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const session = useSession();

  const { data: dataProfile } = useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getProfile(),
  });

  return (
    <>
      <Navbar>
        <NavbarContent justify="start">
          <NavbarBrand>
            <h1 className="text-3xl font-bold">SiVolunteer</h1>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center">
          <NavbarItem>
            <ToggleDarkmode />
          </NavbarItem>
        </NavbarContent>
        {session.status === "authenticated" ? (
          <NavbarContent justify="end">
            <NavbarItem>
              {dataProfile?.data.data.role === "admin" && (
                <Button
                  as={Link}
                  color="primary"
                  variant="flat"
                  href="/admin/dashboard"
                >
                  Admin Dashboard
                </Button>
              )}
              {dataProfile?.data.data.role === "member" && (
                <Button
                  as={Link}
                  color="primary"
                  variant="flat"
                  href="/member/dashboard"
                >
                  Member Dashboard
                </Button>
              )}
              {dataProfile?.data.data.role === "organizer" && (
                <Button
                  as={Link}
                  color="primary"
                  variant="flat"
                  href="/organizer/dashboard"
                >
                  Organizer Dashboard
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                href="/auth/login"
                color="primary"
                variant="ghost"
              >
                Login
              </Button>
              
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/register"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
      </Navbar>
      <div className="flex h-screen items-center justify-center lg:p-5">
        <TitlePage title="SiVolunteer" />
        <h1 className="text-3xl font-bold">Home</h1>
      </div>
    </>
  );
};

export default HomePage;
