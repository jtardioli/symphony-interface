import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Release } from "../../../ts/releases";

interface Props {
  release: Release;
  setRelease: Dispatch<SetStateAction<Release>>;
  onUpdateMetadata: (key: keyof Release, value: string | number | null) => void;
}

const AddContractData = ({ release, setRelease, onUpdateMetadata }: Props) => {
  return (
    <>
      <section className="flex justify-between gap-[2rem]">
        <div className="flex flex-col w-[30%]">
          <label className="text-[13px] mb-[0.3rem]" htmlFor="mintPrice">
            Mint Price (ETH)
          </label>
          <input
            placeholder="0.05"
            className="w-full h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] appearance-none"
            value={release.mintPrice ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length === 0) {
                onUpdateMetadata("mintPrice", null);
                return;
              }
              onUpdateMetadata("mintPrice", Number(e.target.value));
            }}
            type="number"
          />
        </div>
        <div className="flex flex-col w-[30%]">
          <label className="text-[13px] mb-[0.3rem]" htmlFor="maxNumMints">
            Max Number of Mints
          </label>
          <input
            placeholder="5000"
            className="w-full h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] appearance-none"
            value={release.maxNumMints ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length === 0) {
                onUpdateMetadata("maxNumMints", null);
                return;
              }
              onUpdateMetadata("maxNumMints", Number(e.target.value));
            }}
            type="number"
          />
        </div>
        <div className="flex flex-col w-[13%]">
          <label
            className="text-[13px] mb-[0.3rem]"
            htmlFor="royaltyPercentage"
          >
            Royalty %
          </label>
          <input
            placeholder="10"
            className="w-full h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] appearance-none"
            value={release.royaltyPercentage ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length === 0) {
                onUpdateMetadata("royaltyPercentage", null);
                return;
              }
              onUpdateMetadata("royaltyPercentage", Number(e.target.value));
            }}
            type="number"
          />
        </div>
      </section>
    </>
  );
};

export default AddContractData;
