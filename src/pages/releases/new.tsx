import type { NextPage } from "next";
import Head from "next/head";

import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import Layout from "../../components/Layouts/Layout";
import AddContractData from "../../features/releases/components/AddContractData";
import AddMetadata from "../../features/releases/components/AddMetadata";
import AddTracks from "../../features/releases/components/AddTracks";
import useCreateRelease from "../../features/releases/hooks/useCreateRelease";

const NewRelease: NextPage = () => {
  const { release, setRelease, handleSaveDraft, handleUpdateMetadata } =
    useCreateRelease();

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
        <div className="flex p-5 mt-10 font-extralight">
          <div className="flex flex-col flex-[1] border-r-[1px] border-white pr-[2rem] mr-[1rem] gap-[2rem]">
            <AddMetadata
              release={release}
              setRelease={setRelease}
              onUpdateMetadata={handleUpdateMetadata}
            />
            <AddContractData
              release={release}
              onUpdateMetadata={handleUpdateMetadata}
            />
            <section className="flex justify-between">
              <SecondaryButton onClick={handleSaveDraft}>
                Save as draft
              </SecondaryButton>
              <PrimaryButton>Deploy NFT</PrimaryButton>
            </section>
          </div>
          <AddTracks release={release} setRelease={setRelease} />
        </div>
      </Layout>
    </>
  );
};

export default NewRelease;
