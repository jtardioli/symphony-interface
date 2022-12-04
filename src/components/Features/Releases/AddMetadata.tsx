import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Release, ReleaseType } from "../../../ts/releases";
import GenreInput from "../../Inputs/GenreInput";
import LabeledInput from "../../Inputs/LabeledInput";

import ImageUpload from "./ImageUpload";

interface Props {
  release: Release;
  setRelease: Dispatch<SetStateAction<Release>>;
  onUpdateMetadata: (key: keyof Release, value: string | number | null) => void;
}

const AddMetadata = ({ release, setRelease, onUpdateMetadata }: Props) => {
  return (
    <>
      <section className="flex justify-between max-h-[250px] ">
        <label htmlFor="image" className="hover:cursor-pointer">
          <ImageUpload setRelease={setRelease} />
        </label>
        {/* Inputs beside image */}

        <div className="flex flex-col justify-between w-full">
          <LabeledInput
            value={release.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onUpdateMetadata("title", e.target.value);
            }}
            label="Release Title"
            placeHolder="The Dark Side Of The Moon"
          />
          <LabeledInput
            value={release.artistName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onUpdateMetadata("artistName", e.target.value);
            }}
            label="Artist Name"
            placeHolder="Pink Floyd"
          />

          <div className="flex flex-col w-full">
            <label className="text-[13px] mb-[0.3rem]" htmlFor="Release Type">
              Release Type
            </label>
            <select
              className="w-full h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] appearance-none"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                onUpdateMetadata("releaseType", e.target.value);
              }}
            >
              <option value={ReleaseType.ALBUM}>Album</option>
              <option value={ReleaseType.EP}>EP</option>
              <option value={ReleaseType.SINGLE}>Single</option>
            </select>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-[2rem]">
        <GenreInput />
        <div className="flex flex-col w-full">
          <label className="text-[13px] mb-[0.3rem]" htmlFor="description">
            Description
          </label>
          <textarea
            placeholder="The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd..."
            className="w-full h-[80px] rounded-[15px] border-[1px] border-white outline-none bg-transparent p-[0.5rem] text-[15px] appearance-none"
            value={release.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              onUpdateMetadata("description", e.target.value);
            }}
          />
        </div>
      </section>
    </>
  );
};

export default AddMetadata;
