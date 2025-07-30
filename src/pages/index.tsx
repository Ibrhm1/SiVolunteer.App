import { Button } from "@heroui/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

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
    </div>
  );
};

export default HomePage;
