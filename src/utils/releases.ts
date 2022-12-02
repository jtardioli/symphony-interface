import { Release, ReleaseType, Track } from "../ts/releases";

export const emptyTrack: Track = {
  audio: null,
  title: "",
  file: null,
  id: String(Math.random()),
  position: 1,
  hidden: false,
  ownerId: "44bd6780-4ea5-431e-9ce4-1175888cd28e",
};

export const emptyRelease: Release = {
  id: "",
  ownerId: "",
  artistName: "",
  description: "",
  image: null,
  maxNumMints: null,
  mintPrice: null,
  royaltyPercentage: null,
  title: "",
  tracks: [emptyTrack],
  genres: [],
  releaseType: ReleaseType.ALBUM,
  isDeployed: false,
};
