import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Dispatch, Ref, SetStateAction } from "react";
import { Release } from "../../ts/releases";

interface DateInputProps {
  label: string;
  value: number;
  property: "mintStart" | "mintEnd";
  setRelease: Dispatch<SetStateAction<Release>>;
}

export const DateInput = ({
  label,
  value,
  setRelease,
  property,
}: DateInputProps) => {
  const handleDateChange = (date: Date) => {
    const epochDate = date.getTime();
    setRelease((prev: Release) => {
      const clone = structuredClone(prev);
      clone[property] = epochDate;
      return clone;
    });
  };

  return (
    <div className="flex flex-col">
      <label className="text-[13px] mb-[0.3rem]" htmlFor="Mint End Date/Time">
        {label}
      </label>

      <Flatpickr
        data-enable-time={true}
        value={value}
        onChange={([date]) => {
          handleDateChange(date);
        }}
        options={{ minDate: new Date() }}
        render={({ value, ...props }, ref) => {
          return (
            <CustomInput value={value as number} inputRef={ref} {...props} />
          );
        }}
      />
    </div>
  );
};

interface CustomInputProps {
  inputRef: Ref<HTMLInputElement>;
  value: number;
}

const CustomInput = ({ value, inputRef, ...props }: CustomInputProps) => {
  return (
    <input
      className="w-[270px] h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px]"
      {...props}
      ref={inputRef}
      placeholder="Ex: 2022-10-21 19:20"
      value={value}
    />
  );
};
