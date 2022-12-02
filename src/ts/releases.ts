export interface Release {
  id: string;
  ownerId: string;
  artistName: string;
  description: string;
  image: File | string | null;
  maxNumMints: string | null;
  mintPrice: number | null;
  royaltyPercentage: number | null;
  title: string;
  tracks: Track[];
  genres: string[];
  releaseType: ReleaseType;
  isDeployed: boolean;
}

export interface Track {
  title: string;
  hidden: boolean;
  position: number;
  file: File | string | null;
  id: string;
}

export enum ReleaseType {
  ALBUM = "ALBUM",
  EP = "EP",
  SINGLE = "SINGLE",
}
