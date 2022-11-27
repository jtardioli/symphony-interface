import { ChangeEvent, useState } from "react";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";

import { createReleaseURl, uploadsURl } from "../../api/server";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import AddTracks from "../../components/Features/Releases/AddTracks";
import ImageUpload from "../../components/Features/Releases/ImageUpload";
import { DateInput } from "../../components/Inputs/DateInput";
import Layout from "../../components/Layouts/Layout";
import { Release, ReleaseType } from "../../ts/releases";
import { emptyRelease } from "../../utils/releases";

const NewRelease: NextPage = () => {
  const [release, setRelease] = useState<Release>(emptyRelease);
  const [inputErr, setInputErr] = useState({ title: "" });

  const uploadTrackFiles = async () => {
    const form = new FormData();
    form.append("img", release.image as Blob);
    for (const track of release.tracks) {
      form.append(`track-${track.id}`, track.file as Blob);
    }

    const { data: fileKeys } = await axios.post(uploadsURl, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return fileKeys;
  };

  const validations = () => {};

  const onSaveDraft = async () => {
    const processedRelease = structuredClone(release);

    // const fileKeys = await uploadTrackFiles();

    // processedRelease.image = findKeyByFieldName(fileKeys, "img") as string;
    // for (const track of processedRelease.tracks) {
    //   track.file = findKeyByFieldName(fileKeys, `track-${track.id}`) as string;
    // }
    await axios.post(createReleaseURl, { release: processedRelease });
  };

  const onUpdateMetadata = (key: keyof Release, value: string) => {
    setRelease((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return (
    <>
      <Head>
        <title>Create Release - Symphony</title>
        <meta
          name="Symphony"
          content="interface for musicians to mint and manage their albums"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex font-extralight">
          <div className="flex-[1] border-r-[1px] border-white pr-[2rem] mr-[1rem]">
            {/* Image and basic info */}
            <section className="flex justify-between">
              <label htmlFor="image" className="hover:cursor-pointer">
                <ImageUpload setRelease={setRelease} />
              </label>
              {/* Inputs beside image */}
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col w-full">
                  <label
                    className="text-[13px] mb-[0.3rem]"
                    htmlFor="Release Title"
                  >
                    Release Title
                  </label>
                  <input
                    placeholder="Dark Side Of The Moon"
                    className=" w-full h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] appearance-none"
                    value={release.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      onUpdateMetadata("title", e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-[13px] mb-[0.3rem]"
                    htmlFor="Artist Name"
                  >
                    Artist Name
                  </label>
                  <input
                    placeholder="Pink Floyd"
                    className="w-full h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] appearance-none"
                    value={release.artistName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      onUpdateMetadata("artistName", e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="text-[13px] mb-[0.3rem]"
                    htmlFor="Release Type"
                  >
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

            <section className="flex justify-between mt-[1.5rem]">
              <DateInput
                label="Mint Start Date/Time"
                property="mintStartDateTime"
                setRelease={setRelease}
                value={release.mintStartDateTime}
              />
              <DateInput
                label="Mint End Date/Time"
                property="mintEndDateTime"
                setRelease={setRelease}
                value={release.mintEndDateTime}
              />
            </section>
            <section className="flex justify-between mt-[2rem]">
              <SecondaryButton onClick={onSaveDraft} w="200px">
                Save as draft
              </SecondaryButton>
              <PrimaryButton w="200px">Deploy NFT</PrimaryButton>
            </section>
          </div>
          <AddTracks release={release} setRelease={setRelease} />
        </div>
      </Layout>
    </>
  );
};

export default NewRelease;
