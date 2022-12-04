import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { genresURl } from "../../api/server";

interface Genre {
  id: string;
  name: string;
  releaseCount: number;
}

const GenreInput = () => {
  const [query, setQuery] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [displayGenres, setDisplayGenres] = useState<boolean>(false);

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

  const renderedGenres = genres.map((genre, index) => {
    const lastGenre = index === genres.length - 1;
    return (
      <button
        className={`
        ${
          lastGenre && "rounded-b-[15px]"
        } flex items-center justify-between w-full h-[45px]  border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px] `}
      >
        <p> {genre.name}</p>
        <p>({genre.releaseCount})</p>
      </button>
    );
  });

  return (
    <div className="relative flex flex-col w-full">
      <label className="text-[13px] mb-[0.3rem]" htmlFor="Artist Name">
        Genre(s)
      </label>
      <input
        placeholder="Pink Floyd"
        className={`${
          displayGenres ? "rounded-t-[15px]" : "rounded-[15px]"
        } w-full h-[45px]  border-[1px] border-white outline-none bg-transparent px-[0.5rem] text-[15px]`}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
        onFocus={() => {
          setDisplayGenres(true);
        }}
        onBlur={() => {
          setDisplayGenres(false);
        }}
      />
      <div className=" top-[69px] absolute w-full bg-gradient-to-t from-bg to-[#292929]">
        {displayGenres && renderedGenres}
      </div>
    </div>
  );
};

export default GenreInput;
