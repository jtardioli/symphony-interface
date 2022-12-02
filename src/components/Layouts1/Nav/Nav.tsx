import NavItem from "./NavItem";

const Nav = () => {
  return (
    <nav className="w-[15vw] bg-black h-screen fixed flex items-center flex-col z-10">
      <div className="mt-[18vh]">
        <section className="mb-[2rem]">
          <NavItem href="/home" label="home" />
        </section>
        <section className="mb-[2rem]">
          <NavItem href="/releases/new" label="create release" />
        </section>
        <section></section>
      </div>
    </nav>
  );
};

export default Nav;
