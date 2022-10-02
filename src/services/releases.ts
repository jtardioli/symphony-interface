import { Release } from "../ts/releases";

export const updateTrackPositions = (release: Release) => {
  release.tracks.forEach((track, index) => {
    track.position = index + 1;
  });
  return release;
};
