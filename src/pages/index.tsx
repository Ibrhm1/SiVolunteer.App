import ToggleDarkmode from "@/components/UI/ToggleDarkmode";
import { Button } from "@heroui/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center lg:p-5">
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
      <div>
        <Button onPress={() => router.push("/admin")}>Admin</Button>
        <Button onPress={() => router.push("/member")}>Member</Button>
        <Button onPress={() => router.push("/organizer")}>Organizer</Button>
      </div>
      <br />
      <ToggleDarkmode />
    </div>
  );
};

export default HomePage;
