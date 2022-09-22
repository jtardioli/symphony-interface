import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-[100%]">
      <nav className="w-[15vw] bg-black h-screen fixed"></nav>
      <div className="w-[85vw] bg-bg h-screen left-[15vw] fixed -z-20"></div>
      <div className="h-[30vh] bg-gradient-to-t from-bg to-[#292929] top-[7vh] w-full -z-10 fixed"></div>
      <div className="w-full ml-[15vw]">
        <header className=" bg-bg h-[7vh] max-h-[70px] sticky z-20   top-0"></header>
        <div className="p-[1rem]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
