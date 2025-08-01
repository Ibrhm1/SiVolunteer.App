import ToggleDarkmode from "@/components/UI/ToggleDarkmode";
import { Button } from "@heroui/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center lg:p-5">
      <h1 className="text-3xl font-bold">Home</h1>
      <Button
        color="warning"
        variant="shadow"
        onPress={() => router.push("/auth/login")}
      >
        Login
      </Button>
      <ToggleDarkmode />
    </div>
  );
};

export default HomePage;
