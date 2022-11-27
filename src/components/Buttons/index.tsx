import { MouseEventHandler, ReactNode } from "react";

export const PrimaryButton = ({
  w,
  children,
  onClick,
}: {
  w: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[${w}] h-[40px] text-white rounded-[15px] bg-primary font-normal`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({
  w,
  children,
  onClick,
}: {
  w: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={`w-[${w}] h-[40px] text-black rounded-[15px] bg-darkWhite font-normal hover:bg-white flex justify-center items-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
