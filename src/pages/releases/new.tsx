import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layouts/Layout";
import { LabeledInput, TrackInput } from "../../components/inputs";
import { ChangeEvent, useState } from "react";

const NewRelease: NextPage = () => {
  const [release, setRelease] = useState<any>({});
  const [img, setImg] = useState("");

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const clone = structuredClone(release);
    const imgFile = e.target.files![0];
    reader.onload = (e) => {
      setImg(e.target!.result as string);
    };
    reader.readAsDataURL(imgFile);
    clone.img = imgFile;
    setRelease(clone);
  };

  return (
    <>
      <Head>
        <title>Symphony - Create Release</title>
        <meta
          name="Symphony"
          content="interface for musicians to mint and manage their albums"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex font-extralight">
          <div className="flex-[1] border-r-[1px] border-white pr-[2rem] mr-[2rem]">
            <section className="flex justify-between">
              <label htmlFor="image" className="hover:cursor-pointer">
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpg"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="relative h-[18vw] w-[18vw]  max-w-[550px] max-h-[550px] flex items-center justify-center  bg-black mr-[1rem]">
                  {!release.img && <p>No image chosen</p>}
                  {img && (
                    <Image
                      src={img}
                      alt="Picture of Albums"
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
                </div>
              </label>

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
            <section className="flex items-center  mt-[1.5rem] justify-between">
              <LabeledInput
                w="180px"
                label="Mint Price (ETH)"
                placeholder="Ex: 0.25"
              />
              <LabeledInput
                w="180px"
                label="Max Number Of Mints"
                placeholder="Ex: 10,000"
              />
              <div className="flex">
                <LabeledInput w="80px" label="Royalty %" placeholder="Ex: 15" />
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
          <div className="red flex-[0.9]">
            <div className="flex items-center justify-between mb-[2rem]">
              <h1 className="text-2xl">Add Tracks</h1>
              <button className="w-[30px] h-[30px] text-black rounded-[50%] bg-darkWhite font-normal items-center justify-center flex text-xl">
                +
              </button>
            </div>
            {/* Songs */}
            <div>
              <TrackInput index={1} title="" fileName="blah_blah.mp3" />
              <TrackInput index={2} title="" fileName="blah_blah.mp3" />
              <TrackInput index={3} title="" fileName="blah_blah.mp3" />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default NewRelease;
