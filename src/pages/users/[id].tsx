import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
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

  const renderedReleases = user.releases.map((release) => {
    return (
      <div key={release.id}>
        <p>{release.name}</p>
        <p>{release.artistName}</p>
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
        <div className="flex font-extralight">HELOOOO</div>
        {renderedReleases}
      </Layout>
    </>
  );
};

export default Profile;
