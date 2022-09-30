import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { Release } from "../../ts/releases";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  w?: string;
  handleChange: (
    property: string,
    newValue: string,
    isNumber: boolean | undefined
  ) => void;
  property: string;
  isNumber?: boolean;
}

export const LabeledInput = ({
  label,
  placeholder,
  w,
  handleChange,
  property,
  isNumber,
}: LabeledInputProps) => {
  const width = w ? w : "270px";

  return (
    <div className="flex flex-col">
      <label className="text-[13px] mb-[0.3rem]" htmlFor={label}>
        {label}
      </label>
      <input
        className="h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px]"
        name={label}
        placeholder={placeholder}
        style={{ width: width }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleChange(property, e.target.value, isNumber);
        }}
      />
    </div>
  );
};
