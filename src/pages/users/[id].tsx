import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuth } from "../../contexts/AuthContext";
import MyProfile from "../../features/users/pages/MyProfile";
import UserProfile from "../../features/users/pages/UserProfile";

const Profile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const myProfile = id === user.id;

  return (
    <>
      {myProfile && <MyProfile id={user.id} />}
      {!myProfile && <UserProfile />}
    </>
  );
};

export default Profile;
