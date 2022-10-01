import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layouts/Layout";
import { LabeledInput } from "../../components/inputs";
import { ChangeEvent, useState } from "react";
import { Release, ReleaseType } from "../../ts/releases";
import { TrackInput } from "../../components/inputs/TrackInput";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const emptyTrack = { title: "", file: null, id: String(Math.random()) };
const emptyRelease: Release = {
  artist: "",
  credits: "",
  description: "",
  imgFile: null,
  maxMints: 0,
  mintEnd: 0,
  mintPrice: 0,
  mintStart: 0,
  royaltyPercentage: 0,
  tags: "",
  title: "",
  tracks: [emptyTrack],
  type: ReleaseType.ALBUM,
};

const NewRelease: NextPage = () => {
  const [release, setRelease] = useState<Release>(emptyRelease);
  const [img, setImg] = useState<string>("");

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const clone = structuredClone(release);
    const imgFile = e.target.files![0];

    /* async method which loads image file as url */
    reader.onload = (e) => {
      setImg(e.target!.result as string);
    };

    reader.readAsDataURL(imgFile);
    clone.imgFile = imgFile;
    setRelease(clone);
  };

  const handleEditMetaData = (
    property: string,
    newValue: string,
    isNumber: boolean = false
  ) => {
    const clone = structuredClone(release);
    // @ts-ignore
    clone[property] = !isNumber ? newValue : Number(newValue);
    setRelease(clone);
  };

  const handleAddTrack = () => {
    const clone = structuredClone(release);
    clone.tracks.push({ title: "", file: null, id: String(Math.random()) });
    setRelease(clone);
  };

  const handleDragEnd = (params: any) => {
    const clone = structuredClone(release);

    const srcIndex = params.source.index; // the index that was grabbed
    const desIndex = params.destination?.index; // the index you dragged the item to

    const movedItem = clone.tracks.splice(srcIndex, 1)[0]; // splice returns an array of the objects removed

    clone.tracks.splice(desIndex!, 0, movedItem);
    setRelease(clone);
  };

  const renderTracks = release.tracks.map((track, index) => {
    return (
      <Draggable key={track.id} draggableId={String(track.id)} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TrackInput
              index={index + 1}
              title={track.title}
              file={track.file}
              setRelease={setRelease}
            />
          </div>
        )}
      </Draggable>
    );
  });

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
                  {!release.imgFile && <p>No image chosen</p>}
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
                  handleChange={handleEditMetaData}
                  property="title"
                />
                <LabeledInput
                  label="Artist Name"
                  placeholder="Ex: Pink Floyd"
                  property="artist"
                  handleChange={handleEditMetaData}
                />
                <div className="flex flex-col">
                  <label
                    className="text-[13px] mb-[0.3rem]"
                    htmlFor="Release Type"
                  >
                    Release Type
                  </label>
                  <select
                    className="w-[270px] h-[45px] rounded-[15px] border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px]"
                    name="Release Type"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      handleEditMetaData("type", e.target.value);
                    }}
                  >
                    <option value={ReleaseType.ALBUM}>Album</option>
                    <option value={ReleaseType.EP}>Ep</option>
                    <option value={ReleaseType.SINGLE}>Single</option>
                  </select>
                </div>
              </div>
            </section>
            <section className="flex justify-between mt-[1.5rem]">
              <LabeledInput
                label="Credits"
                placeholder="Ex: Roger Waters, David Gilmore"
                property="credits"
                handleChange={handleEditMetaData}
              />
              <LabeledInput
                label="Tags"
                placeholder="Ex: Rock, Classic Rock"
                property="tags"
                handleChange={handleEditMetaData}
              />
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
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleEditMetaData("description", e.target.value)
                  }
                />
              </div>
            </section>
            <section className="flex items-center  mt-[1.5rem] justify-between">
              <LabeledInput
                w="180px"
                label="Mint Price (ETH)"
                placeholder="Ex: 0.25"
                property="mintPrice"
                handleChange={handleEditMetaData}
              />
              <LabeledInput
                w="180px"
                label="Max Number Of Mints"
                placeholder="Ex: 10,000"
                property="maxMints"
                handleChange={handleEditMetaData}
                isNumber
              />
              <div className="flex">
                <LabeledInput
                  w="80px"
                  label="Royalty %"
                  placeholder="Ex: 15"
                  property="royaltyPercentage"
                  handleChange={handleEditMetaData}
                  isNumber
                />
                <p className="mt-[1.8rem] ml-1 text-2xl">%</p>
              </div>
            </section>
            <section className="flex justify-between mt-[1.5rem]">
              <LabeledInput
                label="Mint Start Date"
                placeholder="12/12/2022 5pm EST"
                property="mintStart"
                handleChange={handleEditMetaData}
                isNumber
              />
              <LabeledInput
                label="Mint End Date"
                placeholder="12/12/2022 8pm EST"
                property="mintEnd"
                handleChange={handleEditMetaData}
                isNumber
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
              <button
                onClick={handleAddTrack}
                className="w-[30px] h-[30px] text-black rounded-[50%] bg-darkWhite font-normal items-center justify-center flex text-xl"
              >
                +
              </button>
            </div>
            {/* Tracks */}
            <div>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="1">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {renderTracks}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default NewRelease;
