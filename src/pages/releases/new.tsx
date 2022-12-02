import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";

import { createReleaseURl, uploadsURl } from "../../api/server";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import AddContractData from "../../components/Features/Releases/AddContractData";
import AddMetadata from "../../components/Features/Releases/AddMetadata";
import AddTracks from "../../components/Features/Releases/AddTracks";
import Layout from "../../components/Layouts/Layout";
import { Release } from "../../ts/releases";
import { emptyRelease } from "../../utils/releases";

const NewRelease: NextPage = () => {
  const [release, setRelease] = useState<Release>(emptyRelease);

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

  const onSaveDraft = async () => {
    try {
      const processedRelease = structuredClone(release);

      // const fileKeys = await uploadTrackFiles();

      // processedRelease.image = findKeyByFieldName(fileKeys, "img") as string;
      // for (const track of processedRelease.tracks) {
      //   track.file = findKeyByFieldName(fileKeys, `track-${track.id}`) as string;
      // }
      await axios.post(createReleaseURl, { release: processedRelease });
      toast.success("Release saved as draft");
    } catch (error) {
      console.log(
        `releases/new::onSaveDraft() - Failed to save draft: ${error}`
      );
      toast.error("Failed to save release");
    }
  };

  const onUpdateMetadata = (
    key: keyof Release,
    value: string | number | null
  ) => {
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
          <div className="flex flex-col flex-[1] border-r-[1px] border-white pr-[2rem] mr-[1rem] gap-[2rem]">
            <AddMetadata
              release={release}
              setRelease={setRelease}
              onUpdateMetadata={onUpdateMetadata}
            />
            <AddContractData
              release={release}
              setRelease={setRelease}
              onUpdateMetadata={onUpdateMetadata}
            />
            <section className="flex justify-between">
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
