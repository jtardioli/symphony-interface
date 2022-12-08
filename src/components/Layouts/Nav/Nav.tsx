import NavItem from "./NavItem";

const Nav = () => {
  return (
    <nav className="w-[15vw] bg-black h-screen fixed flex items-center flex-col z-10">
      <div className="mt-[18vh] flex flex-col gap-[1rem]">
        <NavItem href="/home" label="home" />
        <NavItem href="/releases/new" label="create release" />
        <NavItem
          href="/users/44bd6780-4ea5-431e-9ce4-1175888cd28e"
          label="profile"
        />

        <section></section>
      </div>
    </nav>
  );
};

export default Nav;
