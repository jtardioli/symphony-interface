import React, { useState } from "react";

const SignInModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen} className="underline text-primary">
        Open Modal
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-opacity-50 bg-darkPrimary">
          <div className="relative w-full max-w-md mx-auto my-[10vh] rounded-md shadow-xl bg-bgColor">
            <div className="relative px-6 py-4">
              <div className="text-2xl font-bold text-white">Modal Title</div>
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
            <div className="px-6 py-4 text-white">Modal body goes here</div>
            <div className="flex justify-end px-6 py-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-white rounded-full bg-primary hover:bg-darkPrimary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
