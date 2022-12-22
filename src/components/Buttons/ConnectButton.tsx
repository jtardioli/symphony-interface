import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

import { useAuth } from "../../contexts/AuthContext";

import { PrimaryButton } from ".";

/**
 * https://www.rainbowkit.com/docs/custom-connect-button
 */
export const ConnectButton = () => {
  const { address, addressEns } = useAuth();

  return (
    <RainbowConnectButton.Custom>
      {({
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = mounted && address && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <PrimaryButton onClick={openConnectModal}>
                    Connect Wallet
                  </PrimaryButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <PrimaryButton onClick={openChainModal}>
                    Wrong network
                  </PrimaryButton>
                );
              }

              return (
                <button
                  className="w-36 h-[40px] text-white rounded-[15px] bg-primary font-normal  px-3"
                  onClick={openAccountModal}
                >
                  <div className="truncate">{addressEns}</div>
                </button>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};

export default ConnectButton;
