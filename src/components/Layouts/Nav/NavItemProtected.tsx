import React, { FC } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../../contexts/AuthContext";

interface Props {
  href: string;
  label: string;
}

const NavItemProtected: FC<Props> = ({ href, label }) => {
  const router = useRouter();
  const { isAuthenticated, handleOpen } = useAuth();

  const selected = router.asPath === href;
  return (
    <div
      onClick={() => {
        if (!isAuthenticated) {
          handleOpen();
          return;
        }
        router.push(href);
      }}
    >
      <p
        className={`mb-[0.5rem] hover:cursor-pointer capitalize ${
          !selected && "text-grayText"
        } `}
      >
        {label}
      </p>
    </div>
  );
};

export default NavItemProtected;
