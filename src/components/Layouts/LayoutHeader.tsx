import React from "react";

import { useAuth } from "../../contexts/AuthContext";
import ConnectButton from "../Buttons/ConnectButton";

const LayoutHeader = () => {
  const { isAuthenticated, signInWithEthereum } = useAuth();
  return (
    <header className=" bg-bg h-[7vh] max-h-[70px] sticky z-20 top-0 flex items-center justify-end px-[1rem]">
      <ConnectButton />
    </header>
  );
};

export default LayoutHeader;
