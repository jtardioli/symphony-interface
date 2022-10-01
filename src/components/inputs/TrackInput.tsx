import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Release } from "../../ts/releases";

interface TrackInputProps {
  index: number;
  title: string;
  file: File | null;
  hidden: boolean;
  position: number;
  setRelease: Dispatch<SetStateAction<Release>>;
}

export const TrackInput = ({
  index,
  title,
  file,
  hidden,
  position,
  setRelease,
}: TrackInputProps) => {
  const handleDelete = (index: number) => {
    setRelease((prev: Release) => {
      const clone = structuredClone(prev);
      clone.tracks.splice(index - 1, 1);
      return clone;
    });
  };

  const handleEditTrackTitle = (newValue: string) => {
    setRelease((prev: Release) => {
      const clone = structuredClone(prev);
      clone.tracks[index - 1].title = newValue;
      return clone;
    });
  };

  const handleToggleHidden = () => {
    setRelease((prev: Release) => {
      const clone = structuredClone(prev);
      clone.tracks[index - 1].hidden = !clone.tracks[index - 1].hidden;
      return clone;
    });
  };

  const handleTrackUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setRelease((prev: Release) => {
      const clone = structuredClone(prev);
      const trackFile = e.target.files![0];
      clone.tracks[index - 1].file = trackFile;
      return clone;
    });
  };

  return (
    <div className="flex items-center justify-between mb-[1rem] cursor-grab active:cursor-grabbing">
      <div className="flex items-center">
        <h2 className="text-[32px] min-w-[35px]">{position}.</h2>
        <div className="font-normal ">
          <input
            placeholder="Track Title"
            className="h-[30px] rounded-[15px] outline-none bg-transparent  text-base px-[5px] w-[300px]"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleEditTrackTitle(e.target.value);
            }}
          />
          <p className="text-[12px] text-grayText px-[5px]">
            {file ? file.name : "example.mp3/example.wav"}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <label htmlFor={`track-${index}`} className="hover:cursor-pointer">
          <input
            type="file"
            name={`track-${index}`}
            id={`track-${index}`}
            accept="audio.wav"
            className="hidden"
            onChange={handleTrackUpload}
          />
          <div className="w-[100px] h-[35px] text-black rounded-[15px] bg-darkWhite font-normal mr-[0.5rem] flex justify-center items-center">
            Upload
          </div>
        </label>

        <button onClick={handleToggleHidden} className="mr-[0.5rem]">
          {hidden ? <AiFillEyeInvisible size={35} /> : <AiFillEye size={35} />}
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
