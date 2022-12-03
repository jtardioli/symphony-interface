import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { createReleaseURl, uploadsURl } from "../../api/server";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import AddContractData from "../../components/Features/Releases/AddContractData";
import AddMetadata from "../../components/Features/Releases/AddMetadata";
import AddTracks from "../../components/Features/Releases/AddTracks";
import Layout from "../../components/Layouts/Layout";
import { Release } from "../../ts/releases";
import { findKeyByFieldName } from "../../utils/file";
import { emptyRelease } from "../../utils/releases";

const NewRelease: NextPage = () => {
  const router = useRouter();
  const [release, setRelease] = useState<Release>(emptyRelease);

  /* 
    Uploads all files to s3 bucket and returns their corresponding keys
  */
  const uploadFiles = async () => {
    try {
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
    } catch (error) {
      console.log(
        `releases/new::uploadTrackFiles() - Failed to upload release files: ${error}`
      );
      throw Error(
        `releases/new::uploadTrackFiles() - Failed to save draft: ${error}`
      );
    }
  };

  const onSaveDraft = async () => {
    try {
      const processedRelease = structuredClone(release);

      const fileKeys = await uploadFiles();

      processedRelease.image = findKeyByFieldName(fileKeys, "img") as string;

      /* 
        1. Loop through each track and set its audio value to the new S3 key
        2. remove track properties key and id as they are not needed 
        for the db insert
      */
      for (const track of processedRelease.tracks) {
        track.audio = findKeyByFieldName(
          fileKeys,
          `track-${track.id}`
        ) as string;
        delete track.file;
        delete track.id;
      }

      await axios.post(createReleaseURl, { release: processedRelease });
      router.push("/home");
    } catch (error) {
      console.log(
        `releases/new::onSaveDraft() - Failed to save draft: ${error}`
      );
      throw Error(
        `releases/new::onSaveDraft() - Failed to save draft: ${error}`
      );
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
              <SecondaryButton
                onClick={() => {
                  toast.promise(onSaveDraft, {
                    pending:
                      "Processing your music files. This could take a few minutes",
                    success: "Release saved successfully",
                    error: "Failed to save release 🤯",
                  });
                }}
                w="200px"
              >
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
