import { useState, useEffect, useRef } from "react";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRight from "@heroicons/react/24/outline/ChevronRightIcon";
import PageIndicator from "./Page_Indicator";
import MovieCard from "./MovieCard";

type cardProp = {
  endPoint: string;
  title: string;
};

const ContentRow = ({ title, endPoint }: cardProp) => {
  const slideRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);
  const cardPerPage = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);

  const disablePrev = currentPage === 0;
  const disableNext = currentPage + 1 === pageCount;

  const getMovieData = async () => {
    const popularMovie = await fetchRequest<MovieResponse<MovieResult[]>>(
      endPoint
    );
    setRowData(popularMovie.results);
  };

 

  const onNextClick = () => {
    if (slideRef.current) {
      const updatedTranslateX = translateX - getTranslateXValue();
      slideRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevClick = () => {
    if (slideRef.current) {
      const updatedTranslateX = translateX + getTranslateXValue();
      slideRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage - 1);
    }
  };

  const getTranslateXValue = () => {
    let translateX = 0;
    if (slideRef.current) {
      translateX =
        ((cardPerPage.current * 200) / slideRef.current.clientWidth) * 100;
    }
    return translateX;
  };

  useEffect(() => {
    if (rowData?.length) {
      if (containerRef.current) {
        cardPerPage.current = Math.floor(
          containerRef.current.clientWidth / 200
        );
        setPageCount(Math.ceil(rowData.length / cardPerPage.current));
      }
    }
  }, [rowData.length]);

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <section className="row-container ml-12 hover:cursor-pointer">
      <h2 className="mb-2">{title}</h2>
      <PageIndicator
        className="mb-4 opacity-0 transition-transform duration-300 ease-in"
        pageCount={pageCount}
        currentPage={currentPage}
      />
      <section
        ref={containerRef}
        className="relative flex flex-nowrap gap-2 overflow-hidden"
      >
        {!disablePrev ? (
          <button
            className="absolute z-[1] h-full w-8 bg-black/25 opacity-0 transition-transform duration-300 ease-in"
            onClick={prevClick}
          >
            <ChevronLeft />
          </button>
        ) : null}
        {!disableNext ? (
          <button
            className="absolute right-0 z-[1] h-full w-8 bg-black/25 opacity-0 transition-transform duration-300 ease-in"
            onClick={onNextClick}
          >
            <ChevronRight />
          </button>
        ) : null}
        <section
          ref={slideRef}
          className="flex gap-2 transition-transform duration-700 ease-linear"
        >
          {rowData?.map((row,i) => {
            return  <MovieCard key={`${row.id}-${i}`} {...row} />
          })}
        </section>
      </section>
    </section>
  );
};

export default ContentRow;
