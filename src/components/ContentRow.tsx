import { useState, useEffect } from "react";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";

type cardProp = {
  endPoint: string;
  title: string;
};

const ContentRow = ({ title, endPoint }: cardProp) => {
  const [rowData, setRowData] = useState<MovieResult[]>([]);

  const getMovieData = async () => {
    const popularMovie = await fetchRequest<MovieResponse<MovieResult[]>>(
      endPoint
    );
    setRowData(popularMovie.results);
  };

  const createImageUrl = (path: string) => {
    return `${import.meta.env.VITE_IMAGE_URL}/${path}`;
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <section className="px-3">
      <h2 className="mb-4">{title}</h2>
      <section className="flex overflow-x-auto my-2 ">
        {rowData?.map((row) => {
          const { id, title, poster_path } = row;
          console.log(row);
          return (
            <section key={id} className="flex-shrink-0 w-[200px] h-[250px]">
                <img
                  src={createImageUrl(poster_path)}
                  alt={title}
                  className="h-full w-full object-contain"
                />
            </section>
          );
        })}
      </section>
    </section>
  );
};

export default ContentRow;
