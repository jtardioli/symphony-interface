import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { MetaDataKeys, Release } from "../../ts/releases";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  w?: string;
  handleChange: (
    property: MetaDataKeys,
    newValue: string | number | null
  ) => void;
  property: MetaDataKeys;
  value: string | number | null;
  maxLength?: number;
  type?: string;
  min?: number;
  isNumber?: boolean;
}

export const LabeledInput = ({
  label,
  placeholder,
  w,
  handleChange,
  property,
  value,
  maxLength,
  type,
  min,
  isNumber,
}: LabeledInputProps) => {
  const width = w ? w : "270px";

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue;
    if (isNumber) {
      /*   
        This allows the input to be cleared
        otherwise epmpty inputs would be converted to 0
      */
      if (e.target.value === "") {
        newValue = null;
        handleChange(property, newValue);
        return;
      }
      /*   
        Set Numeric values to type number
      */
      newValue = Number(e.target.value);
      handleChange(property, newValue);
      return;
    }
    /*   
      Set string values
    */
    newValue = e.target.value;
    handleChange(property, newValue);
  };

  return (
    <div className="flex flex-col">
      <label className="text-[13px] mb-[0.3rem]" htmlFor={label}>
        {label}
      </label>
      <input
        className="h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] appearance-none"
        name={label}
        value={value!}
        placeholder={placeholder}
        style={{ width: width }}
        onChange={onChange}
        maxLength={maxLength}
        type={type}
        min={min}
      />
    </div>
  );
};
