import { Release } from "./releases";

export interface MyProfile {
  id: string;
  name: string;
  address: string;
  email: string | null;
  bio: string | null;
  profilePicture: string | null;
  profileBanner: string | null;
  releases: Release[];
}
