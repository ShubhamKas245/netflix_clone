import { useState, useEffect } from "react";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRight from "@heroicons/react/24/outline/ChevronRightIcon";

type cardProp = {
  endPoint: string;
  title: string;
};

const ContentRow = ({ title, endPoint }: cardProp) => {
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMovieData = async () => {
    const popularMovie = await fetchRequest<MovieResponse<MovieResult[]>>(endPoint);
    setRowData(popularMovie.results);
    setIsLoading(false);
  };

  const createImageUrl = (path: string) => {
    return `${import.meta.env.VITE_IMAGE_URL}/${path}`;
  };

  const handleNext = (): void => {
    setCurrentIndex((prevIndex) => {
      const nextPageIndex = prevIndex + itemsPerPage;
      const lastPageIndex = rowData.length - itemsPerPage;
      return nextPageIndex > lastPageIndex ? lastPageIndex : nextPageIndex;
    });
  };

  const handlePrev = (): void => {
    setCurrentIndex((prevIndex) => {
      const prevPageIndex = prevIndex - itemsPerPage;
      return prevPageIndex < 0 ? 0 : prevPageIndex;
    });
  };

  useEffect(() => {
    const handleResize = (): void => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setItemsPerPage(8);
      } else if (screenWidth >= 768) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize(); // Call on initial load
    window.addEventListener("resize", handleResize); // Add event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, [itemsPerPage]);

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <section className="row-container ml-6 hover:cursor-pointer">
      <h2 className="mb-4">{title}</h2>
      <section className="relative">
        <section className="my-2 flex overflow-x-auto">
          {isLoading ? (
            // Display shimmer effect while loading
            <>
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div
                  key={index}
                  className="sm:h-36 w-36 sm:w-28 md:w-52 lg:h-52 flex-shrink-0 px-2"
                />
              ))}
            </>
          ) : (
            // Display actual data
            <>
              {rowData
                ?.slice(currentIndex, currentIndex + itemsPerPage)
                .map((row) => {
                  const { id, title, poster_path } = row;
                  console.log(row);
                  return (
                    <section
                      key={id}
                      className="sm:h-36 w-36 sm:w-28 md:w-52 lg:h-52 flex-shrink-0 px-2"

                    >
                      <img
                        loading="lazy"
                        className="h-full w-full rounded-lg"
                        src={createImageUrl(poster_path)}
                        alt={title}
                      />
                    </section>
                  );
                })}
            </>
          )}
        </section>
        <button className="absolute top-0 left-0 py-20" onClick={handlePrev}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute top-0 right-0 py-20" onClick={handleNext}>
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>
    </section>
  );
};

export default ContentRow;
