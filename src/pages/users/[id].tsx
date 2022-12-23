import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { getUserUrl } from "../../api/server";
import Layout from "../../components/Layouts/Layout";

const Profile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState({ releases: [] });

  useEffect(() => {
    if (!id) return;
    axios
      .get(getUserUrl(id as string))
      .then(({ data: user }) => {
        console.log("LLLLL", user);
        setUser(user);
      })
      .catch((error) => {
        toast.error("Failed to fetch the current user");
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <Head>
        <title>Symphony</title>
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
              <div className="flex items-center mt-[14vh] ml-[7vw] z-50 gap-4">
                <div className="rounded-full h-[135px] w-[135px] bg-darkWhite relative overflow-hidden ">
                  <Image
                    src="https://images.unsplash.com/photo-1635269854437-378a897af758?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    layout="fill"
                    objectFit="cover"
                    alt="pfp"
                  />
                </div>

                <div className="flex flex-col">
                  <h1 className="font-medium leading-[55px] text-7xl"></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
