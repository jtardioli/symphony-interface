import { Release, ReleaseType, Track } from "../ts/releases";

export const emptyTrack: Track = {
  title: "",
  file: null,
  id: String(Math.random()),
  position: 1,
  hidden: false,
};

export const emptyRelease: Release = {
  id: "",
  ownerId: "",
  artistName: "",
  credits: "",
  description: "",
  image: null,
  maxNumMints: null,
  mintEndDateTime: null,
  mintPrice: null,
  mintStartDateTime: null,
  royaltyPercentage: null,
  title: "",
  tracks: [emptyTrack],
  genres: [],
  releaseType: ReleaseType.ALBUM,
  isDeployed: false,
};
