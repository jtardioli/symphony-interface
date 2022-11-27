import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import { Release } from "../../../ts/releases";
import { toBase64 } from "../../../utils/file";

const ImageUpload = ({
  setRelease,
}: {
  setRelease: Dispatch<SetStateAction<Release>>;
}) => {
  const [displayImg, setDisplayImg] = useState<string | null>(null);

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files![0];

    setRelease((prev) => {
      const clone = structuredClone(prev);
      clone.image = imgFile;
      return clone;
    });

    const imgUrl = await toBase64(imgFile);
    setDisplayImg(imgUrl as string);
  };

  return (
    <>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/png, image/jpg"
        className="hidden"
        onChange={onImageUpload}
      />
      <div className="relative h-[18vw] w-[18vw]  max-w-[550px] max-h-[550px] flex items-center justify-center  bg-black mr-[1rem]">
        {!displayImg && <p>Choose Image </p>}
        {displayImg && (
          <Image
            src={displayImg}
            alt="Picture of Albums"
            layout="fill"
            objectFit="contain"
          />
        )}
      </div>
    </>
  );
};

export default ImageUpload;
