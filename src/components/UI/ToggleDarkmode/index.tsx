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
  let [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = [
    {
      theme: "light",
      icon: <MdOutlineLightMode />,
    },
    {
      theme: "dark",
      icon: <IoMoonOutline />,
    },
    {
      theme: "system",
      icon: <TiDeviceDesktop />,
    },
  ];

  const handleTheme = () => {
    setCount((index: number) => {
      const nextIndex = (index + 1) % currentTheme.length;
      setTheme(currentTheme[nextIndex].theme);
      return nextIndex;
    });
  };

  return (
    <div className="flex" hidden={hidden}>
      <Button isIconOnly variant="flat" onPress={() => handleTheme()}>
        {currentTheme.map((item) => item.theme === theme && item.icon)}
      </Button>
    </div>
  );
};

export default ToggleDarkmode;
