export interface Release {
  artist: string;
  credits: string;
  description: string;
  imgFile: File | null;
  maxMints: number;
  mintEnd: number;
  mintPrice: number;
  mintStart: number;
  royaltyPercentage: number;
  tags: string;
  title: string;
  tracks: Track[];
  type: ReleaseType;
}

export interface Track {
  title: string;
  file: File | null;
  id: string;
}

export enum ReleaseType {
  ALBUM = "ALBUM",
  EP = "EP",
  SINGLE = "SINGLE",
}
