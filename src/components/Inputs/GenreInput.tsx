import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

import { genresURl } from "../../api/server";
import { Genre } from "../../interfaces/genre";
import { Release } from "../../interfaces/releases";

interface Props {
  release: Release;
  setRelease: Dispatch<SetStateAction<Release>>;
}

const GenreInput = ({ release, setRelease }: Props) => {
  const [query, setQuery] = useState<string>("");

  /* 
    Genres fetched from the api for the user to select
  */
  const [genres, setGenres] = useState<Genre[]>([]);

  const [displayGenres, setDisplayGenres] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      setDisplayGenres(false);
    });
  });

  useEffect(() => {
    (async () => {
      try {
        const { data: queriedGenres } = await axios.get<Genre[]>(genresURl, {
          params: { query, take: 7, page: 1 },
        });
        setGenres(queriedGenres);
      } catch (error) {
        console.log("GenreInput::useEffect() - Failed to fetch genres");
        toast.error;
        ("Unable to display available genres.");
      }
    })();
  }, [query]);

  const handleAddGenre = (newGenre: Genre) => {
    const duplicateGenre = release.genres.find((genre) => {
      return genre.id === newGenre.id;
    });
    if (duplicateGenre) return;
    const newRelease = structuredClone(release);
    newRelease.genres.push(newGenre);
    setRelease(newRelease);

    inputRef.current!.focus();
    setQuery("");
  };

  const handleDeleteGenre = (id: string) => {
    const index = release.genres.findIndex((genre) => {
      return genre?.id === id;
    });

    const newRelease = structuredClone(release);
    newRelease.genres.splice(index, 1);
    setRelease(newRelease);
    inputRef.current?.focus();
  };

  const renderedGenres = genres.map((genre, index) => {
    const lastGenre = index === genres.length - 1;
    return (
      <button
        className={`
        ${
          lastGenre && "rounded-b-[15px]"
        } flex items-center justify-between w-full h-[45px]  border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] `}
        onClick={() => {
          handleAddGenre(genre);
        }}
      >
        <p> {genre.name}</p>
        <p>({genre.releaseCount})</p>
      </button>
    );
  });

  const renderedSelectedGenres = release.genres.map((genre) => {
    return (
      <Tag
        id={genre?.id!}
        label={genre?.name!}
        onDeleteGenre={handleDeleteGenre}
      />
    );
  });

  return (
    <div className="relative flex flex-col w-full">
      <label className="text-[13px] mb-[0.3rem]" htmlFor="Artist Name">
        Genre(s) - search and select genres from the dropdown
      </label>

      <div
        className={`${
          displayGenres ? "rounded-t-[15px]" : "rounded-[15px]"
        } flex items-center gap-2  h-[45px]  border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px hover:cursor-text max-w-[30vw] min-w-full overflow-x-scroll scrollbar-hide`}
        onClick={(e) => {
          e.stopPropagation();
          setDisplayGenres(true);
          inputRef.current?.focus();
        }}
      >
        {renderedSelectedGenres}

        <input
          className="h-full outline-none bg-transparent px-[0.5rem] text-[15px]"
          value={query}
          ref={inputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div
        className="flex-col top-[69px] absolute w-full bg-gradient-to-t from-bg to-[#292929]"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        {displayGenres && renderedGenres}
      </div>
    </div>
  );
};

interface TagProps {
  label: string;
  id: string;
  onDeleteGenre: (id: string) => void;
}

export const Tag = ({ label, id, onDeleteGenre }: TagProps) => {
  return (
    <div className="flex items-center gap-1  h-[60%] bg-primary px-2 rounded-[5px]">
      <p className="text-xs w-[max-content]">{label}</p>
      <button
        onClick={() => {
          onDeleteGenre(id);
        }}
        className="hover:cursor-pointer"
      >
        <AiFillCloseCircle />
      </button>
    </div>
  );
};

export default GenreInput;
