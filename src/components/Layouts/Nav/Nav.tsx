import { useAuth } from "../../../contexts/AuthContext";
import ConnectButton from "../../Buttons/ConnectButton";

import NavItem from "./NavItem";
import NavItemProtected from "./NavItemProtected";

const Nav = () => {
  const { user } = useAuth();
  return (
    <nav className="w-[15vw] bg-black h-screen fixed flex items-center flex-col z-10">
      <div className="mt-5">
        <ConnectButton />
      </div>
      <div>
        <div className="mt-[8vh] flex flex-col gap-[0.5rem]">
          <NavItem href="/home" label="home" />
          <NavItemProtected href="/releases/new" label="create release" />
          <NavItemProtected href={`/users/${user?.id}`} label="profile" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
