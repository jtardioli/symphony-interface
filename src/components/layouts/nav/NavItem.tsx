import Link from "next/link";
import { Url } from "../../../ts/utils";
import { useRouter } from "next/router";

interface Props {
  href: Url;
  label: string;
}

const NavItem = ({ href, label }: Props) => {
  const router = useRouter();
  const selected = router.pathname === href;

  return (
    <Link href={href}>
      <p
        className={`mb-[0.5rem] hover:cursor-pointer capitalize ${
          !selected && "text-grayText"
        } `}
      >
        {label}
      </p>
    </Link>
  );
};

export default NavItem;
