import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layouts/Layout";
import { LabeledInput } from "../../components/inputs";
import { ChangeEvent, useState } from "react";
import { TrackInput } from "../../components/inputs/TrackInput";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DateInput } from "../../components/inputs/DateInput";

import { updateTrackPositions } from "../../services/releases";

import { MetaDataKeys, Release, ReleaseType } from "../../ts/releases";
import { emptyRelease } from "../../utils/releases";
import { createReleaseURl } from "../../api/server";
import axios from "axios";

const NewRelease: NextPage = () => {
  const [release, setRelease] = useState<Release>(emptyRelease);
  const [img, setImg] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  /*  
    Uploads Image and stores a URL which can be passed to CSS 
    for display purposes in the img useState
  */
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
    property: MetaDataKeys,
    newValue: string | number | null
  ) => {
    const clone = structuredClone(release);
    // @ts-ignore
    clone[property] = newValue;
    setRelease(clone);
  };

  const handleAddTrack = () => {
    const clone = structuredClone(release);
    clone.tracks.push({
      title: "",
      file: null,
      position: clone.tracks.length + 1,
      id: String(Math.random()),
      hidden: false,
    });
    setRelease(clone);
  };

  const handleDragEnd = (params: any) => {
    const clone = structuredClone(release);

    const srcIndex = params.source.index; // the index that was grabbed
    const desIndex = params.destination?.index; // the index you dragged the item to

    const movedItem = clone.tracks.splice(srcIndex, 1)[0]; // splice returns an array of the objects removed

    clone.tracks.splice(desIndex!, 0, movedItem);

    updateTrackPositions(clone);
    setRelease(clone);
  };

  const handleSaveDraft = async () => {
    try {
      await axios.post(createReleaseURl, { release });
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Looks like something went wrong. We failed to save your draft"
      );
    }
  };

  const renderTracks = release.tracks.map((track, index) => {
    return (
      <Draggable key={track.id} draggableId={String(track.id)} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps} // place this prop where you can grab item
            className="flex items-center"
          >
            <TrackInput
              index={index}
              id={track.id}
              position={track.position}
              title={track.title}
              hidden={track.hidden}
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
        <div className="flex font-extralight">
          <div className="flex-[1] border-r-[1px] border-white pr-[2rem] mr-[1rem]">
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
                  value={release.title}
                  maxLength={120}
                />
                <LabeledInput
                  label="Artist Name"
                  placeholder="Ex: Pink Floyd"
                  property="artist"
                  handleChange={handleEditMetaData}
                  value={release.artist}
                  maxLength={120}
                />
                <div className="flex flex-col">
                  <label
                    className="text-[13px] mb-[0.3rem]"
                    htmlFor="Release Type"
                  >
                    Release Type
                  </label>
                  <div className="w-[270px] h-[45px] rounded-[15px] border-[1px] border-white  bg-transparent px-[0.5] text-[15px]">
                    <select
                      className="w-[260px] h-[45px] rounded-[15px] outline-none  bg-transparent pl-[0.3rem] text-[15px]"
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
              </div>
            </section>
            <section className="flex justify-between mt-[1.5rem]">
              <LabeledInput
                label="Credits"
                placeholder="Ex: Roger Waters, David Gilmore"
                property="credits"
                handleChange={handleEditMetaData}
                value={release.credits}
                maxLength={200}
              />
              <LabeledInput
                label="Tags"
                placeholder="Ex: Rock, Bossa Nova, Samba"
                property="tags"
                handleChange={handleEditMetaData}
                value={release.tags}
                maxLength={120}
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
                  maxLength={500}
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
                value={release.mintPrice}
                type="number"
                min={0}
                isNumber
              />
              <LabeledInput
                w="180px"
                label="Max Number Of Mints"
                placeholder="Ex: 10,000"
                property="maxMints"
                handleChange={handleEditMetaData}
                value={release.maxMints}
                type="number"
                min={0}
                isNumber
              />
              <div className="flex">
                <LabeledInput
                  w="80px"
                  label="Royalty %"
                  placeholder="Ex: 15"
                  property="royaltyPercentage"
                  handleChange={handleEditMetaData}
                  value={release.royaltyPercentage}
                  type="number"
                  min={0}
                  isNumber
                />
                <p className="mt-[1.8rem] ml-1 text-2xl">%</p>
              </div>
            </section>
            <section className="flex justify-between mt-[1.5rem]">
              <DateInput
                label="Mint Start Date/Time"
                property="mintStart"
                setRelease={setRelease}
                value={release.mintStart}
              />
              <DateInput
                label="Mint End Date/Time"
                property="mintEnd"
                setRelease={setRelease}
                value={release.mintEnd}
              />
            </section>
            <section className="flex justify-between mt-[2rem]">
              <button
                onClick={handleSaveDraft}
                className="w-[200px] h-[40px] text-black rounded-[15px] bg-darkWhite font-normal"
              >
                Save draft
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
        </div>
      </Layout>
    </>
  );
};

export default NewRelease;
