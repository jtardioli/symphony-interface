import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { usersURl } from "../../api/server";
import { useAuth } from "../../contexts/AuthContext";
import { PrimaryButton } from "../Buttons";
import ConnectButton from "../Buttons/ConnectButton";
import LabeledInput from "../Inputs/LabeledInput";

import Modal from ".";

const SignInModal = () => {
  const {
    address,
    isVerified,
    signInWithEthereum,
    isOpen,
    handleClose,
    user,
    updateAuthenticated,
  } = useAuth();

  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleCreateAccount = async () => {
    try {
      const { name, email } = newUser;
      await axios.post(usersURl, { name, email, address });
      const { user } = await updateAuthenticated(address);
      if (user) {
        handleClose();
      }

      toast.success(`Welcome ${user.name}!`);
    } catch (error: any) {
      console.log("handeCreateAccount():: Error:", error.message);
      toast.error("Failed to create account. Please refresh and try again");
    }
  };

  const handleSignIn = async () => {
    await signInWithEthereum();
    const { user } = await updateAuthenticated(address);
    if (user) {
      handleClose();
    }
  };

  const showVerify = address && !isVerified;

  const showCreateAccount = address && isVerified && !user;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Verification">
      <div className="flex flex-col items-center justify-center w-full gap-2">
        {!address && <ConnectButton />}
        {showVerify && (
          <>
            <p>Prove you own this wallet</p>
            <PrimaryButton onClick={handleSignIn}>Sign In</PrimaryButton>
          </>
        )}
        {showCreateAccount && (
          <div>
            <h3 className="mb-3 text-lg"> Create your account</h3>
            <div className="flex flex-col gap-8">
              <LabeledInput
                label="Name"
                placeHolder="The Beatles"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewUser({ ...newUser, name: e.target.value });
                }}
                value={newUser.name}
              />
              <LabeledInput
                label="Email - (optional, used for updates about the platform)"
                type="email"
                placeHolder="gharrsion@gmail.com"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewUser({ ...newUser, email: e.target.value });
                }}
                value={newUser.email}
              />
              <div className="opacity-50 ">
                <LabeledInput
                  label="Address"
                  placeHolder={address}
                  onChange={() => {}}
                  value={""}
                  disabled
                />
              </div>
              <PrimaryButton onClick={handleCreateAccount}>
                Create Account
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SignInModal;
