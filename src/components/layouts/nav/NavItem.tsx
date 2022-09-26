import Link from "next/link";
import { Url } from "../../../ts/utils";

interface Props {
  href: Url;
  label: string;
}

const NavItem = ({ href, label }: Props) => {
  return (
    <Link href={href}>
      <p className="mb-[0.5rem] hover:cursor-pointer capitalize">{label}</p>
    </Link>
  );
};

export default NavItem;
