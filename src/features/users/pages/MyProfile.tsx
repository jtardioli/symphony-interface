import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

import { getUserUrl } from "../../../api/api";
import Layout from "../../../components/Layouts";
import { MyProfile } from "../../../interfaces/users";
import { getImageUrl } from "../../../utils/image";

interface Props {
  id: string;
}

enum View {
  HOME,
  ALBUMS,
  TRACKS,
  DRAFTS,
}

const emptyProfile: MyProfile = {
  id: "",
  name: "",
  address: "",
  email: "",
  bio: "",
  profilePicture: "",
  profileBanner: "",
  releases: [],
};

const MyProfile: FC<Props> = ({ id }) => {
  const [user, setUser] = useState<MyProfile>(emptyProfile);
  const [view, setView] = useState<View>(View.HOME);

  useEffect(() => {
    if (!id) return;
    axios
      .get(getUserUrl(id))
      .then(({ data: user }) => {
        setUser(user);
      })
      .catch((error) => {
        toast.error("Failed to fetch the current user");
        console.log(error);
      });
  }, [id]);

  const renderedReleases = user.releases.map((release) => {
    return (
      <div className="flex flex-col gap-2 px-2 pt-2 pb-5 rounded-md bg-content w-max hover:cursor-pointer hover:bg-[#5a5a5d9f] hover:scale-105 transition-all duration-100">
        <div className="h-[180px] w-[180px]  relative overflow-hidden rounded-md">
          <Image
            src={getImageUrl(release.image as string)}
            layout="fill"
            objectFit="cover"
            alt="pfp"
          />
        </div>
        <div className="w-[180px]">
          <p className="mb-1 text-sm truncate">{release.title}</p>
          <p className="text-[13px] text-grayText truncate">
            {release.artistName}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>{user.name} - Symphony</title>
        <meta
          name="Symphony"
          content="interface for musicians to mint and manage their albums"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex font-extralight">
          <div className="w-full h-[38vh] relative">
            <Image
              src="https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80"
              layout="fill"
              objectFit="cover"
              className="banner_img"
              alt="pfp"
            />
            <div>
              <div className="flex items-center mt-[11vh] ml-[7vw] z-50 gap-4">
                <div className="rounded-full h-[150px] w-[150px] relative overflow-hidden ">
                  <Image
                    src="https://images.unsplash.com/photo-1635269854437-378a897af758?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    layout="fill"
                    objectFit="cover"
                    alt="pfp"
                  />
                </div>

                <div className="flex flex-col">
                  <h1 className="font-medium leading-[55px] text-7xl">
                    {user.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex items-center w-full h-12  bg-gradient-to-b from-[#282828] to-[#191919] border-b-[1px] border-[#282828] px-[7vw]
        "
        >
          <div
            className={`flex items-center h-full hover:border-b-2 hover:border-darkWhite px-8 hover:cursor-pointer ${
              view === View.HOME && "border-b-2 border-darkWhite"
            }`}
            onClick={() => {
              setView(View.HOME);
            }}
          >
            <p>Home</p>
          </div>
          <div
            className={`flex items-center h-full hover:border-b-2 hover:border-darkWhite px-8 hover:cursor-pointer ${
              view === View.ALBUMS && "border-b-2 border-darkWhite"
            }`}
            onClick={() => {
              setView(View.ALBUMS);
            }}
          >
            <p>Albums & EPs</p>
          </div>
          <div
            className={`flex items-center h-full hover:border-b-2 hover:border-darkWhite px-8 hover:cursor-pointer ${
              view === View.TRACKS && "border-b-2 border-darkWhite"
            }`}
            onClick={() => {
              setView(View.TRACKS);
            }}
          >
            <p>Tracks & Singles</p>
          </div>
          <div
            className={`flex items-center h-full hover:border-b-2 hover:border-darkWhite px-8 hover:cursor-pointer ${
              view === View.DRAFTS && "border-b-2 border-darkWhite"
            }`}
            onClick={() => {
              setView(View.DRAFTS);
            }}
          >
            <p>Drafts</p>
          </div>
        </div>
        <section className="flex gap-5 p-8">{renderedReleases}</section>
      </Layout>
    </>
  );
};

export default MyProfile;
