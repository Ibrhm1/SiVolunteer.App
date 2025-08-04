import TitlePage from "@/components/common/TitlePage";
import ToggleDarkmode from "@/components/UI/ToggleDarkmode";
import { Button } from "@heroui/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center lg:p-5">
      <TitlePage title="SiVolunteer" />
      <h1 className="text-3xl font-bold">Home</h1>
      <div>
        <Button
          color="warning"
          variant="shadow"
          onPress={() => router.push("/auth/login")}
        >
          Login
        </Button>
      </div>
      <br />
      <ToggleDarkmode />
    </div>
  );
};

export default HomePage;
