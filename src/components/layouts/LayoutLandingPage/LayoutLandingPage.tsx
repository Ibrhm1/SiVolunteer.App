import TitlePage from "@/components/common/TitlePage";
import LayoutNavbar from "./LayoutNavbar";
import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title: string;
}

const LayoutLandingPage = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <>
      <TitlePage title={title} />
      <LayoutNavbar />
      <main>{children}</main>
    </>
  );
};

export default LayoutLandingPage;
