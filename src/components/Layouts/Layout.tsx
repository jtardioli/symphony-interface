import { ReactNode } from "react";

import { useAuth } from "../../contexts/AuthContext";
import SignInModal from "../Modals/SignInModal";

import Nav from "./Nav/Nav";
import LayoutHeader from "./LayoutHeader";

const Layout = ({ children }: { children: ReactNode }) => {
  const { signInWithEthereum, isAuthenticated } = useAuth();
  return (
    <div className="flex h-screen w-[100%]">
      <Nav />
      {/* Background */}
      <div className="w-[85vw] bg-bg h-screen left-[15vw] fixed -z-20"></div>
      {/* Gradient */}
      <div className="h-[30vh] bg-gradient-to-t from-bg to-[#292929] top-[7vh] w-full -z-10 fixed"></div>
      {/* Main Content*/}
      <div className="w-full ml-[15vw]">
        <LayoutHeader />
        <div className="p-[2rem]">
          <SignInModal />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
