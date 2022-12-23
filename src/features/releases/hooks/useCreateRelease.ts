import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

import { createReleaseURl, uploadsURl } from "../../../api/server";
import { useAuth } from "../../../contexts/AuthContext";
import { Release, ReleaseType, Track } from "../../../interfaces/releases";
import { findKeyByFieldName } from "../../../utils/file";

const useCreateRelease = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [release, setRelease] = useState<Release>(emptyRelease);

  /* 
    Update ownerId if user is changed during account creation 
  */
  useEffect(() => {
    setRelease((prev) => {
      const newRelease = structuredClone(prev);
      newRelease.artistName = user?.name || "";
      newRelease.ownerId = user?.id || "";
      newRelease.tracks = newRelease.tracks.map((track) => {
        return { ...track, ownerId: user?.id || "" };
      });
      return newRelease;
    });
  }, [user]);

  const handleUpdateMetadata = (
    key: keyof Release,
    value: string | number | null
  ) => {
    setRelease((prev) => {
      return { ...prev, [key]: value };
    });
  };

  /* 
    Uploads all files to s3 bucket and returns their corresponding keys
  */
  const uploadFiles = async () => {
    try {
      const form = new FormData();
      form.append("img", release.image as Blob);
      for (const track of release.tracks) {
        form.append(`track-${track.id}`, track.file as Blob);
      }

      const { data: fileKeys } = await axios.post(uploadsURl, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return fileKeys;
    } catch (error) {
      console.log(
        `releases/new::uploadTrackFiles() - Failed to upload release files: ${error}`
      );
      throw Error(
        `releases/new::uploadTrackFiles() - Failed to save draft: ${error}`
      );
    }
  };

  const saveDraft = async () => {
    try {
      const processedRelease = structuredClone(release);

      const fileKeys = await uploadFiles();

      processedRelease.image = findKeyByFieldName(fileKeys, "img") as string;

      /* 
        1. Loop through each track and set its audio value to the new S3 key
        2. remove track properties key and id as they are not needed 
        for the db insert
      */
      for (const track of processedRelease.tracks) {
        track.audio = findKeyByFieldName(
          fileKeys,
          `track-${track.id}`
        ) as string;
        delete track.file;
        delete track.id;
      }

      /* 
        make sure genres only have id property for db connection
      */
      processedRelease.genres = processedRelease.genres.map((genre) => {
        return { id: genre.id };
      });

      await axios.post(createReleaseURl, { release: processedRelease });
      router.push("/home");
    } catch (error) {
      console.log(`releases/new::saveDraft() - Failed to save draft: ${error}`);
      throw Error(`releases/new::saveDraft() - Failed to save draft: ${error}`);
    }
  };

  const handleSaveDraft = () => {
    toast.promise(saveDraft, {
      pending: "Processing your music files. This could take a few minutes",
      success: "Release saved successfully",
      error: "Failed to save release 🤯",
    });
  };

  return { release, setRelease, handleSaveDraft, handleUpdateMetadata };
};

export default useCreateRelease;

const emptyTrack: Track = {
  audio: null,
  title: "",
  file: null,
  id: String(Math.random()),
  position: 1,
  hidden: false,
  ownerId: "",
};

const emptyRelease: Release = {
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
