import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layouts/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Symphony - Home</title>
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
          <Link href="/releases/new">
            <button className="w-[200px] h-[40px] text-white rounded-[15px] bg-primary font-normal">
              Create Release
            </button>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Home;
