import { FC, MouseEventHandler, ReactNode } from "react";

interface Props {
  w?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const defaultWidth = "w-48";

export const PrimaryButton: FC<Props> = ({ w, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${w} h-[40px] text-white rounded-[15px] bg-primary font-normal`}
    >
      {children}
    </button>
  );
};

PrimaryButton.defaultProps = {
  w: defaultWidth,
};

export const SecondaryButton: FC<Props> = ({ w, children, onClick }) => {
  return (
    <button
      className={`${w}  h-[40px] text-black rounded-[15px] bg-darkWhite font-normal hover:bg-white flex justify-center items-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

SecondaryButton.defaultProps = {
  w: defaultWidth,
};
