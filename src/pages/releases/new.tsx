import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import LabeledInput from "../../components/inputs/LabeledInput";
import Layout from "../../components/layouts/Layout";

const NewRelease: NextPage = () => {
  return (
    <>
      <Head>
        <title>Symphony - Discover</title>
        <meta
          name="Symphony"
          content="interface for musicians to mint and manage their albums"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex font-extralight">
          <div className="flex-[1] border-r-[1px] border-white pr-[2rem]">
            <section className="flex justify-between">
              <div className="relative h-[18vw] w-[18vw]  max-w-[550px] max-h-[550px] lg:flex hidden bg-red mr-[1rem]">
                <Image
                  src="/images/albums.png"
                  alt="Picture of Albums"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex flex-col justify-between">
                <LabeledInput
                  label="Release Title"
                  placeholder="Ex: Dark Side Of The Moon"
                />
                <LabeledInput
                  label="Artist Name"
                  placeholder="Ex: Pink Floyd"
                />
                <LabeledInput label="Release Type" placeholder="Album" />
              </div>
            </section>
            <section className="flex justify-between mt-[1.5rem]">
              <LabeledInput
                label="Credits"
                placeholder="Ex: Roger Waters, David Gilmore"
              />
              <LabeledInput label="Tags" placeholder="Ex: Rock, Classic Rock" />
            </section>
            <section className="mt-[1.5rem]">
              <div className="flex flex-col ">
                <label
                  className="text-[13px] mb-[0.3rem]"
                  htmlFor="Description"
                >
                  Description
                </label>
                <textarea
                  className="w-ful h-[80px] rounded-[15px] border-[1px] border-white outline-none bg-transparent p-[0.5rem] text-[15px]"
                  name="Description"
                />
              </div>
            </section>
            <section className="flex items-center justify-between mt-[1.5rem]">
              <LabeledInput
                w="50px"
                label="Mint Price (ETH)"
                placeholder="Ex: 0.25"
              />
              <LabeledInput
                w="50px"
                label="Max Number Of Mints"
                placeholder="Ex: 10,000"
              />
              <div className="flex">
                <LabeledInput
                  w="100px"
                  label="Royalty %"
                  placeholder="Ex: 15"
                />
                <p className="mt-[1.8rem] ml-1 text-2xl">%</p>
              </div>
            </section>
            <section className="flex justify-between mt-[1.5rem]">
              <LabeledInput
                label="Mint Start Date"
                placeholder="12/12/2022 5pm EST"
              />
              <LabeledInput
                label="Mint End Date"
                placeholder="12/12/2022 8pm EST"
              />
            </section>
            <section className="flex justify-between mt-[2rem]">
              <button className="w-[200px] h-[40px] text-black rounded-[15px] bg-darkWhite font-normal">
                Save as draft
              </button>
              <button className="w-[200px] h-[40px] text-white rounded-[15px] bg-primary font-normal">
                Deploy NFT
              </button>
            </section>
          </div>
          <div className="red flex-[0.9]"></div>
        </main>
      </Layout>
    </>
  );
};

export default NewRelease;
