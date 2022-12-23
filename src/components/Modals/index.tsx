import React, { FC, ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: FC<Props> = ({ isOpen, handleClose, title, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full transition-all ease-in-out bg-opacity-50 bg-darkPrimary duration-900">
          <div className="relative w-full max-w-md mx-auto my-[10vh] rounded-md shadow-xl bg-bgColor">
            <div className="relative px-6 py-4">
              <div className="text-2xl font-bold text-white">{title}</div>
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            <div className="px-6 py-4 text-white">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
