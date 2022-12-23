import React, { ChangeEvent } from "react";

interface Props {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  subMessage?: string;
  value: string;
  disabled?: boolean;
  type?: string;
}

const LabeledInput = ({
  label,
  onChange,
  placeHolder,
  subMessage,
  value,
  disabled,
  type,
}: Props) => {
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="flex flex-col w-full">
        <label className="text-[13px] mb-[0.3rem]" htmlFor={label}>
          {label}
        </label>
        <input
          placeholder={placeHolder}
          className=" w-full h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] appearance-none"
          value={value}
          onChange={onChange}
          disabled={disabled}
          type={type}
        />
      </div>
      {subMessage && (
        <p className="text-[13px] mb-[0.3rem] opacity-60">{subMessage}</p>
      )}
    </div>
  );
};

export default LabeledInput;
