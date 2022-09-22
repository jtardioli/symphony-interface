import type { NextPage } from "next";
import Head from "next/head";
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
        <div>hi</div>
      </Layout>
    </>
  );
};

export default Home;
