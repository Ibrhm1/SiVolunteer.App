import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { TiDeviceDesktop } from "react-icons/ti";

interface PropTypes {
  hidden?: boolean;
}

const ToggleDarkmode = (props: PropTypes) => {
  const { hidden } = props;
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className="bg-default-200 border-default flex rounded-3xl border-1"
        hidden={hidden}
      >
        <Button
          isIconOnly
          size="sm"
          className="rounded-full"
          onPress={() => setTheme("light")}
          color={theme === "light" ? "primary" : "default"}
        >
          <MdOutlineLightMode />
        </Button>
        <Button
          isIconOnly
          size="sm"
          className="rounded-full"
          onPress={() => setTheme("dark")}
          color={theme === "dark" ? "primary" : "default"}
        >
          <IoMoonOutline />
        </Button>
        <Button
          isIconOnly
          size="sm"
          className="rounded-full"
          onPress={() => setTheme("system")}
          color={theme === "system" ? "primary" : "default"}
        >
          <TiDeviceDesktop />
        </Button>
      </div>
    </>
  );
};

export default ToggleDarkmode;
