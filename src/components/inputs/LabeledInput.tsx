import React from "react";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  w?: string;
}

const LabeledInput = ({ label, placeholder, w }: LabeledInputProps) => {
  const width = w ? w : "270px";
  return (
    <div className="flex flex-col ">
      <label className=" text-[13px] mb-[0.3rem]" htmlFor={label}>
        {label}
      </label>
      <input
        className={`w-[${width}] h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px]`}
        name={label}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LabeledInput;
