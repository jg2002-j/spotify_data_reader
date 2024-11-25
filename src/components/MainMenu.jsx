import { Suspense } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";
import { useImage } from "react-image";
import { Button } from "@headlessui/react";

export default function MainMenu({
  switchJSON,
  jsonFileArray,
  index,
  dateRange,
  darkMode,
}) {
  const FullSpotifyLogo = () => {
    const imageSource = darkMode
      ? "../Full_Logo_Green_RGB.svg"
      : "../Full_Logo_Black_RGB.svg";
    const { src } = useImage({
      srcList: [imageSource],
    });

    return <img alt="Spotify Logo" src={src} />;
  };

  return (
    <div className="w-[50vw] flex flex-col gap-5 items-center me-5 ">
      <div className="w-full max-w-96">
        <Suspense
          fallback={
            <h2 className="text-stone-600 font-extrabold">Loading...</h2>
          }
        >
          <FullSpotifyLogo />
        </Suspense>
      </div>
      <h1 className="text-3xl font-bold select-none">Spotify JSON Reader</h1>
      <div className="default p-5 flex flex-col gap-3 items-center">
        <div className="flex gap-3 items-center">
          <Button
            className="bg-stone-900/10 dark:bg-stone-300/10 size-12 flex items-center justify-center rounded-full text-stone-800 dark:text-stone-300 text-lg hover:bg-stone-900/40 dark:hover:bg-stone-300/40 group duration-150 transition-all"
            onClick={() => switchJSON("-")}
          >
            <ArrowLeftCircleIcon className="size-7 group-hover:size-9 duration-150 transition-all" />{" "}
          </Button>
          <div className="flex flex-col gap-2 items-center">
            <h2 className="bg-stone-900/10 dark:bg-stone-300/10 px-5 py-1 text-sm rounded text-stone-800 dark:text-stone-300">
              {jsonFileArray.length === 0
                ? "Loading..."
                : `${index + 1} / ${jsonFileArray.length}`}
            </h2>
            <h1 className="text-lg font-bold">{dateRange}</h1>
          </div>
          <Button
            className="bg-stone-900/10 dark:bg-stone-300/10 size-12 flex items-center justify-center rounded-full text-stone-800 dark:text-stone-300 text-lg hover:bg-stone-900/40 dark:hover:bg-stone-300/40 group duration-150 transition-all"
            onClick={() => switchJSON("+")}
          >
            <ArrowRightCircleIcon className="size-7 group-hover:size-9 duration-150 transition-all" />{" "}
          </Button>
        </div>
      </div>
      <p className="dark:bg-stone-300/10 bg-stone-900/10 p-3 rounded text-sm text-balance w-fit max-w-80 text-center">
        Visit{" "}
        <a href="https://www.spotify.com/uk/account/privacy/">
          Spotify &gt; Account &gt; Privacy
        </a>{" "}
        to download a copy of your streaming data.
      </p>
    </div>
  );
}
