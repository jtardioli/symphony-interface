import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaGuitar } from "react-icons/fa";
import { MdOutlineAlbum } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";

const Landing: NextPage = () => {
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
      <div className="bg-bgColor font-extralight  max-w-[100%] relative overflow-x-hidden">
        <main className="  max-w-[1300px] mx-auto px-[1rem] lg:px-[40px] min-h-screen flex flex-col o">
          <section className="flex items-stretch justify-center min-h-screen lg:justify-between">
            <div className="flex-grow-[1] hidden flex-col items-stretch justify-end  lg:flex z-20">
              <div className="bg-[url('/images/woman-looking-up.png')] flex-grow-[1] max-h-[87vh] min-1-[30vw] bg-contain bg-no-repeat bg-left-bottom"></div>
            </div>
            <div className="flex  flex-col items-start m-[1rem] self-center -mt-[3rem]  tracking-[1px]	">
              <h1 className="mb-[3rem] text-5xl ">Feel The Groove</h1>
              <p className="mb-[3rem] text-2xl ">
                Create. Curate. Collect. Music for the world{" "}
              </p>
              <button className="h-[50px] w-[250px] bg-primary  text-2xl  rounded-[15px]">
                Join Now
              </button>
            </div>
          </section>
          <section className="flex items-center justify-between min-h-screen">
            <div className="max-w-[500px]">
              <h1 className="mb-[3rem] text-5xl ">Discover music NFTs</h1>
              <div className="flex mb-[3rem]">
                <div className="bg-darkPrimary m-[0.5rem] p-[0.75rem] pt-[1.3rem] w-[100px] h-[130px] rounded-[15px] flex flex-col items-center justify-between">
                  <FaGuitar size={50} />
                  <p>Create</p>
                </div>
                <div className="bg-darkPrimary m-[0.5rem] p-[0.75rem] pt-[1.3rem] w-[100px] h-[130px] rounded-[15px] flex flex-col items-center justify-between">
                  <MdOutlineAlbum size={50} />
                  <p>Curate</p>
                </div>
                <div className="bg-darkPrimary m-[0.5rem] p-[0.75rem] pt-[1.3rem] w-[100px] h-[130px] rounded-[15px] flex flex-col items-center justify-between">
                  <BiPhotoAlbum size={50} />
                  <p>Collect</p>
                </div>
              </div>
              <p className="text-2xl ">
                Artists can deploy NFT albums in minutes making{" "}
                <span className="text-primary">Symphony</span> the first stop
                for music collectors and enthusiasts.
              </p>
            </div>
            <div>
              <div className="relative h-[33vw] w-[33vw] ml-[2rem]">
                <Image
                  src="/images/albums.png"
                  alt="Picture of Albums"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </section>
          <section className="flex items-center justify-between min-h-screen">
            <div>
              <div className="relative h-[40vw] w-[40vw] ml-[2rem]">
                <Image
                  src="/images/drag-drop.png"
                  alt="Picture of Albums"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="max-w-[500px]">
              <h1 className="mb-[3rem] text-5xl ">Musicians can relax</h1>
              <p className="text-2xl ">
                Simply upload your tracks to{" "}
                <span className="text-primary">Symphony</span> and we will
                generate the smart contract and host your album’s metadata.
              </p>
            </div>
          </section>
        </main>
        <footer className="w-full bg-darkPrimary h-[9vh] flex justify-around items-center">
          <a>Contact Info: joshua.tardioli@gmail.com </a>
          <a>Twitter</a>
          <a>Discord</a>
          <a>Github</a>
        </footer>
      </div>
    </>
  );
};

export default Landing;
