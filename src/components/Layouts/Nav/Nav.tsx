import { useAuth } from "../../../contexts/AuthContext";
import { PrimaryButton } from "../../Buttons";
import ConnectButton from "../../Buttons/ConnectButton";

import NavItem from "./NavItem";
import NavItemProtected from "./NavItemProtected";

const Nav = () => {
  const { address, user, signInWithEthereum, isVerified } = useAuth();
  const showConnectWallet = !address || (address && isVerified);
  const showSignIn = address && !isVerified;
  console.log(showConnectWallet);
  return (
    <nav className="w-[15vw] bg-black h-screen fixed flex items-center flex-col z-10">
      <div className="mt-5">
        {showConnectWallet && <ConnectButton />}
        {showSignIn && (
          <PrimaryButton w="w-[150px]" onClick={signInWithEthereum}>
            Sign in
          </PrimaryButton>
        )}
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
