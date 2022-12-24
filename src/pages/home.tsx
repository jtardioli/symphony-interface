import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { PrimaryButton } from "../components/Buttons";
import Layout from "../components/Layouts";
import { useAuth } from "../contexts/AuthContext";

const Home: NextPage = () => {
  const { isAuthenticated, handleOpen } = useAuth();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Home - Symphony </title>
        <meta
          name="Symphony"
          content="interface for musicians to mint and manage their albums"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mt-[20vh] mb-[3rem]">
            No albums have been minted yet 😭
          </h1>

          <PrimaryButton
            onClick={() => {
              if (!isAuthenticated) {
                handleOpen();
                return;
              }
              router.push("/releases/new");
            }}
          >
            Create Release
          </PrimaryButton>
        </div>
      </Layout>
    </>
  );
};

export default Home;
