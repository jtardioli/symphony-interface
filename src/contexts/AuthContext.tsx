import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { SiweMessage } from "siwe";
import { useAccount, useEnsName, useNetwork, useSigner } from "wagmi";

import { walletChangeDelay } from "../../app.config";
import { isAuthUrl, nonceUrl, signInUrl } from "../api/server";
import { useDebounce } from "../hooks/useDebounce";
import { shrinkAddress } from "../utils/string";

let domain: string;
let origin: string;

if (typeof window !== "undefined") {
  domain = window.location.host;
  origin = window.location.origin;
}

type AccountStatus = "disconnected" | "connecting" | "connected";

interface UpdateAuthenticated {
  isVerified: boolean;
  address: string;
  user: any;
}

interface AuthContext {
  accountStatus: AccountStatus;
  address: string;
  addressEns: string;
  signInWithEthereum: () => Promise<void>;
  isVerified: boolean;
  user: any;
  isAuthenticated: boolean;
  updateAuthenticated: (addr: string) => Promise<UpdateAuthenticated>;
  isAuthenticating: boolean;
  isError: boolean;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

class AuthProviderError extends Error {
  constructor(message?: string) {
    super(message);
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = AuthProviderError.name; // stack traces display correctly now
  }
}

/**
 * We need this global variable to know which address is currently selected
 * in Crypto wallet, because the `address` variable in OctavProvider is not
 * set properly due to how Javascript closure works. Hence, we need to have
 * a global variable and update it as soon as debounced-wallet variable changed.
 */
let globalAddress = "";

export const AuthContext = createContext<AuthContext>(undefined!);

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: signer } = useSigner();
  const network = useNetwork();
  /* 
    Address
  */
  const { address: wagmiAddress, status: wagmiStatus } = useAccount();
  const debouncedAddress = useDebounce(wagmiAddress, walletChangeDelay);
  const [accountStatus, setAccountStatus] =
    useState<AccountStatus>("disconnected");
  const [address, setAddress] = useState("");
  const { data: addressEns } = useEnsName({ address });

  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const isAuthenticated = !!address && isVerified && !!user;

  /* 
    Modal
  */
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    /**
     * Reset the account to empty string to speed up UI update
     */
    if (wagmiStatus === "disconnected") {
      setAddress("");
      setAccountStatus("disconnected");
    }

    /**
     * Set status to 'connecting' so that we can have 'Connecting wallet' message
     */
    if (wagmiStatus === "connecting") {
      setAccountStatus("connecting");
    }
  }, [wagmiStatus]);

  useEffect(() => {
    /** Reset error state on wallet init / change */
    globalAddress = debouncedAddress as string;
    setIsError(false);

    (async () => {
      try {
        if (debouncedAddress) {
          /** Important: Reset state to connecting */
          setAccountStatus("connecting");

          const { isVerified } = await updateAuthenticated(debouncedAddress);

          /** Error state */
          if (isVerified === null) {
            throw new Error(
              "updateAuthenticated() returned { isVerified: null }"
            );
          }

          setAddress(debouncedAddress);
          setAccountStatus("connected");
          if (isVerified === false) {
            // TODO: OPEN MODAL?
          }
        } else {
          setAddress("");
          setAccountStatus("disconnected");
        }
      } catch (err: any) {
        console.error(
          `AuthProvider.useEffect([${debouncedAddress}]) - ${
            err?.message || err
          }`
        );
        setIsError(true);
      }
    })();
  }, [debouncedAddress]);

  const createSiweMessage: (
    address: string,
    statement: string
  ) => Promise<string> = async (address, statement) => {
    const res = await axios.get(nonceUrl, { withCredentials: true });

    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: network.chain?.id || 1,
      nonce: res.data,
    });
    return message.prepareMessage();
  };

  const signInWithEthereum: () => Promise<void> = async () => {
    try {
      if (!signer) return;
      const message = await createSiweMessage(
        await signer.getAddress(),
        "Prove wallet ownership."
      );
      const signature = await signer.signMessage(message);

      const res = await axios.post(
        signInUrl,
        { message, signature },
        { withCredentials: true }
      );
      if (res.status === 200) {
        if (isError) {
          setIsError(false);
        }
        console.log(address, "addy");
        updateAuthenticated(address);
        // TODO: close modal
        return;
      }
    } catch (err: any) {
      console.error(
        `AuthProvider.signInWithEthereum() - ${err?.message || err}`
      );
      setIsError(true);
    }
  };

  const updateAuthenticated: (
    addr: string
  ) => Promise<UpdateAuthenticated> = async (addr) => {
    try {
      setIsError(false);
      setIsAuthenticating(true);
      const res = await axios.get<{
        isVerified: boolean;
        address: string;
        user: any;
      }>(isAuthUrl(addr), {
        withCredentials: true,
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 500,
      });
      const { isVerified, address: addressOfAuthData, user } = res.data;

      if (globalAddress.toLowerCase() === addressOfAuthData.toLowerCase()) {
        setIsVerified(isVerified);
        setUser(user);
        return res.data;
      }
      console.log(
        `AuthProvider::updateAuthenticated() - Discarding auth data received for wallet ${addressOfAuthData}`
      );
      return { isVerified: false, user: null, address: addressOfAuthData };
    } catch (err: any) {
      console.error(
        `AuthProvider.updateAuthenticated() - ${err?.message || err}`
      );
      setIsError(true);
      return { isVerified: false, user: null, address: "" };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const value: AuthContext = {
    accountStatus,
    address,
    addressEns: addressEns ? addressEns : shrinkAddress(address),
    signInWithEthereum,
    isVerified,
    user,
    isAuthenticated,
    updateAuthenticated,
    isAuthenticating,
    isError,
    isOpen,
    handleOpen,
    handleClose,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth: () => AuthContext = () => {
  const authContext: AuthContext = useContext(AuthContext);
  if (authContext === null) {
    throw new AuthProviderError(
      "useAuth() can only be used inside of <AuthProvider />, please declare it at a higher level."
    );
  }

  return authContext;
};
