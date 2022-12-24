import React, { Dispatch, SetStateAction } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { TrackInput } from "../../../../components/Inputs/TrackInput";
import { useAuth } from "../../../../contexts/AuthContext";
import { Release } from "../../../../interfaces/releases";
import { updateTrackPositions } from "../../../../services/releases";

const AddTracks = ({
  release,
  setRelease,
}: {
  release: Release;
  setRelease: Dispatch<SetStateAction<Release>>;
}) => {
  const { user } = useAuth();
  const onDragEnd = (params: any) => {
    const clone = structuredClone(release);

    const srcIndex = params.source.index; // the index that was grabbed
    const desIndex = params.destination?.index; // the index you dragged the item to

    const movedItem = clone.tracks.splice(srcIndex, 1)[0]; // splice returns an array of the objects removed

    clone.tracks.splice(desIndex!, 0, movedItem);

    updateTrackPositions(clone);
    setRelease(clone);
  };

  const onAddTrack = () => {
    const clone = structuredClone(release);
    clone.tracks.push({
      title: "",
      file: null,
      position: clone.tracks.length + 1,
      id: String(Math.random()),
      hidden: false,
      audio: null,
      ownerId: user.id,
    });
    setRelease(clone);
  };

  const renderTracks = release.tracks.map((track, index) => {
    return (
      <Draggable key={track.id} draggableId={String(track.id)} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps} // place this prop where you can grab item
            className="flex items-center"
          >
            <TrackInput
              index={index}
              id={track.id!}
              position={track.position}
              title={track.title}
              hidden={track.hidden}
              file={track.file}
              setRelease={setRelease}
            />
          </div>
        )}
      </Draggable>
    );
  });

  return (
    <>
      <div className="red flex-[0.9]">
        <header className="flex items-center justify-between mb-[2rem]">
          <h1 className="text-2xl">Add Tracks</h1>
          <button
            onClick={onAddTrack}
            className="w-[30px] h-[30px] text-black rounded-[50%] bg-darkWhite font-normal items-center justify-center flex text-xl"
          >
            +
          </button>
        </header>
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="1">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {renderTracks}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default AddTracks;
