export interface Release {
  id: string;
  artist: string;
  credits: string;
  description: string;
  imgFile: File | null;
  maxMints: number | null;
  mintEnd: number | null;
  mintPrice: number | null;
  mintStart: number | null;
  royaltyPercentage: number | null;
  tags: string;
  title: string;
  tracks: Track[];
  type: ReleaseType;
}

export interface Track {
  title: string;
  hidden: boolean;
  position: number;
  file: File | null;
  id: string;
}

export enum ReleaseType {
  ALBUM = "ALBUM",
  EP = "EP",
  SINGLE = "SINGLE",
}

export type MetaDataKeys =
  | "title"
  | "artist"
  | "type"
  | "credits"
  | "tags"
  | "description"
  | "mintPrice"
  | "maxMints"
  | "royaltyPercentage";
