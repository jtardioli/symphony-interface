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

interface TrackInputProps {
  index: number;
  title: string;
  file: File | null;
  setRelease: Dispatch<SetStateAction<Release>>;
}

export const TrackInput = ({
  index,
  title,
  file,
  setRelease,
}: TrackInputProps) => {
  const handleDelete = (index: number) => {
    setRelease((prev: Release) => {
      const clone = structuredClone(prev);
      clone.tracks.splice(index - 1, 1);
      return clone;
    });
  };

  const handleEditTrackTitle = (index: number, newValue: string) => {
    setRelease((prev: Release) => {
      const clone = structuredClone(prev);

      clone.tracks[index - 1].title = newValue;
      return clone;
    });
  };

  const handleTrackUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    // reader.onload = (e) => {
    //   // setImg(e.target!.result as string);
    // };
    // reader.readAsDataURL(trackFile);
    // // @ts-ignore
    // clone.imgFile = imgFile;
    // setRelease(clone);
    setRelease((prev: Release) => {
      const clone = structuredClone(prev);
      const trackFile = e.target.files![0];
      clone.tracks[index - 1].file = trackFile;
      return clone;
    });
  };

  console.log(file);

  return (
    <div className="flex items-center justify-between mb-[1rem]">
      <div className="flex items-center">
        <h2 className="text-[32px] min-w-[35px]">{index}.</h2>
        <div className="font-normal ">
          <input
            placeholder="Track Name"
            className="h-[30px] rounded-[15px] outline-none bg-transparent  text-base px-[5px] w-[300px]"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleEditTrackTitle(index, e.target.value);
            }}
          />
          <p className="text-[12px] text-grayText px-[5px]">
            {file ? file.name : "example.mp3"}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <label htmlFor={`track-${index}`} className="hover:cursor-pointer">
          <input
            type="file"
            name={`track-${index}`}
            id={`track-${index}`}
            accept="image/png, image/jpg"
            className="hidden"
            onChange={handleTrackUpload}
          />
          <div className="w-[100px] h-[35px] text-black rounded-[15px] bg-darkWhite font-normal mr-[0.5rem] flex justify-center items-center">
            Upload
          </div>
        </label>

        <button className="mr-[0.5rem]">
          <AiFillEye size={35} />
        </button>
        <button
          onClick={() => {
            handleDelete(index);
          }}
        >
          <AiFillDelete size={35} />
        </button>
      </div>
    </div>
  );
};
