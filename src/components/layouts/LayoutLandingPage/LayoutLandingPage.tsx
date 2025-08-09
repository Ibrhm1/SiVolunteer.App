import TitlePage from "@/components/common/TitlePage";
import LayoutNavbar from "./LayoutNavbar";
import { ReactNode } from "react";
import LayoutFooter from "./LayoutFooter";

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
      <div>{children}</div>
      <LayoutFooter />
    </>
  );
};

export default LayoutLandingPage;
