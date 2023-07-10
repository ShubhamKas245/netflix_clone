import { useEffect, useRef, useState } from "react";
import createImageUrl from "../common/utils";
import Modal from "./Modal";
import YouTube from "react-youtube";
import { fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endPoint";
import PlayIcon from "@heroicons/react/24/solid/PlayCircleIcon";
import LikeIcon from "@heroicons/react/24/outline/HandThumbUpIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import ChevronDown from "@heroicons/react/24/outline/ChevronDownIcon";
import { Position } from "../common/types";

type MovieCardProp = {
  poster_path: string;
  id: number;
  title: string;
};

export type MovieVideoResult<T> = {
  id: number;
  results: T;
  [k: string]: unknown;
};

export type MovieVideoInfo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
  [k: string]: unknown;
};

const MovieCard = ({ poster_path, id, title }: MovieCardProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidePoster,setHidePoster]=useState(false)
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const movieCardRef = useRef<HTMLSelectElement>(null);

  const onClose = (value: boolean): void => {
    setIsOpen(value);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const onMouseEnter = async (e: any) => {
    const [videoInfo] = await fetchMovieInfo();
    let calculatePosition = movieCardRef.current?.getBoundingClientRect();
    console.log({ calculatePosition });
    let top = (calculatePosition?.top ?? 0) - 100;
    let left = (calculatePosition?.left ?? 0) - 100;
    if (left < 0) {
      left = (calculatePosition?.left as number);
    }
    let totalWidth = left + 420;
    if (totalWidth > document.body.clientWidth) {
      left = left - (totalWidth - document.body.clientWidth);
    }

    setPosition({ top, left });
    console.log({ videoInfo });
    setVideoInfo(videoInfo);
    setIsOpen(true);
  };

  const fetchMovieInfo = async () => {
    const res = await fetchRequest<MovieVideoResult<MovieVideoInfo[]>>(
      ENDPOINT.MOVIES_VIDEO.replace("{movie_id}", id.toString())
    );
    return res.results.filter(
      (result) => result.site.toLowerCase() === "youtube"
    );
  };

  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseenter", onMouseEnter);
    () => movieCardRef.current?.removeEventListener("mouseenter", onMouseEnter);
  }, []);

  useEffect(()=>{
    if(videoInfo?.key){
      setTimeout(()=>{
        setHidePoster(true)
      },500)
      
    }
    if(!isOpen){
      setHidePoster(false)
    }
  },[videoInfo,isOpen])

  return (
    <>
      <section
        ref={movieCardRef}
        key={id}
        className="aspect-square flex-none overflow-hidden rounded-md"
      >
        <img
          loading="lazy"
          className="h-full w-[150px] "
          src={createImageUrl(poster_path)}
          alt={title}
        />
      </section>
      <Modal
        title=""
        isOpen={isOpen}
        key={id}
        onClose={onClose}
        closeModal={closeModal}
        position={position}
      >
        <section className="aspect-square transition-[height] duration-500 ease-in" >
          <img src={createImageUrl(poster_path)} alt={title} className={`${hidePoster ? " invisible h-0" : "visible h-[350px]"} w-full`}  />
          <YouTube className={`${!hidePoster ? " invisible h-0" : "visible h-[350px]"} w-full`}
            videoId={videoInfo?.key}
            opts={{
              width: "350px",
              height: "350px",
              playerVars: {
                autoplay: 1,
                playsinline: 1,
                controls: 0,
              },
            }}
          />
          <section className="flex items-center justify-between p-4">
            <ul className="flex items-center justify-evenly gap-4">
              <li className="h-12 w-12">
                <button className="h-full w-full">
                  <PlayIcon></PlayIcon>
                </button>
              </li>
              <li className="h-10 w-10 rounded-full border-2 border-gray-500 hover:border-white">
                <button className="h-full w-full">
                  <PlusIcon />
                </button>
              </li>
              <li className="h-10 w-10 rounded-full border-2 border-gray-500 hover:border-white">
                <button className="h-full w-full">
                  <LikeIcon />
                </button>
              </li>
            </ul>
            <ul className="flex items-center justify-evenly gap-4">
              <li className="h-10 w-10 rounded-full border-2 border-gray-500 hover:border-white">
                <button className="h-full w-full">
                  <ChevronDown />
                </button>
              </li>
            </ul>
          </section>
        </section>
      </Modal>
    </>
  );
};

export default MovieCard;
