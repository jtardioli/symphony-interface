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
  artist: "",
  credits: "",
  description: "",
  imgFile: null,
  maxMints: null,
  mintEnd: null,
  mintPrice: null,
  mintStart: null,
  royaltyPercentage: null,
  tags: "",
  title: "",
  tracks: [emptyTrack],
  type: ReleaseType.ALBUM,
  isDraft: true,
};
