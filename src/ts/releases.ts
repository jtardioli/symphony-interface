export interface Release {
  artist: string;
  credits: string;
  description: string;
  releaseType: ReleaseType;
  royaltyPercentage: number;
  tags: string[];
  title: string;
  tracks: Track[];
  maxMints: number;
  mintPrice: number;
  mintStartDate: number;
  mintEndDate: number;
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
