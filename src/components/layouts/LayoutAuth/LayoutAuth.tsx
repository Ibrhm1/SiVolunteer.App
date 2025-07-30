import { ReactNode } from "react";
import TitlePage from "@/components/common/TitlePage";

interface PropTypes {
  children: ReactNode;
  title: string;
}

const LayoutAuth = (props: PropTypes) => {
  const { children, title } = props;

  return (
    <main className="flex min-h-screen min-w-full items-center justify-center">
      <TitlePage title={title} />
      {children}
    </main>
  );
};

export default LayoutAuth;
