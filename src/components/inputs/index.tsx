import { AiFillDelete, AiFillEye } from "react-icons/ai";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  w?: string;
}

export const LabeledInput = ({ label, placeholder, w }: LabeledInputProps) => {
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
      />
    </div>
  );
};

interface TrackInputProps {
  index: number;
  title: string;
  fileName: string;
}

export const TrackInput = ({ index, title, fileName }: TrackInputProps) => {
  return (
    <div className="flex items-center justify-between mb-[1rem]">
      <div className="flex items-center">
        <h2 className="text-[32px] min-w-[35px]">{index}.</h2>
        <div className="font-normal ">
          <input
            placeholder="Track Name"
            className="h-[30px] rounded-[15px] outline-none bg-transparent  text-base px-[5px] w-[300px]"
            value={title}
          />
          <p className="text-[12px] text-grayText px-[5px]">{fileName}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="w-[100px] h-[35px] text-black rounded-[15px] bg-darkWhite font-normal mr-[0.5rem]">
          Upload
        </button>
        <button className="mr-[0.5rem]">
          <AiFillEye size={35} />
        </button>
        <button>
          <AiFillDelete size={35} />
        </button>
      </div>
    </div>
  );
};
