export interface Release {
  artist: string;
  credits: string;
  description: string;
  imgFile: File;
  maxMints: number;
  mintEnd: number;
  mintPrice: number;
  mintStart: number;
  royaltyPercentage: number;
  tags: string;
  title: string;
  type: ReleaseType;
}

export interface Track {
  title: string;
  soundFile: string;
}

export enum ReleaseType {
  ALBUM = "ALBUM",
  EP = "EP",
  SINGLE = "SINGLE",
}
