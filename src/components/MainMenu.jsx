import { Suspense } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
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
    <div className="w-[40%] flex flex-col gap-5 items-center p-10">
      <div className="w-full max-w-80">
        <Suspense
          fallback={
            <h2 className="text-stone-600 font-extrabold">Loading...</h2>
          }
        >
          <FullSpotifyLogo />
        </Suspense>
      </div>
      <h1 className="text-4xl font-bold select-none my-4">
        Spotify Data Reader
      </h1>
      <div className="NOT_IMPLEMENTED w-96 default_static p-5 flex items-center justify-center text-lg">
        <Button className="default px-12 py-3 text-2xl font-bold">
          Upload
        </Button>
      </div>
      <div className="w-96 default p-5 flex justify-center gap-5 items-center ">
        <Button
          className="bg-stone-900/10 dark:bg-stone-300/10 size-12 flex items-center justify-center rounded-full text-stone-800 dark:text-stone-300 text-lg hover:bg-stone-900/40 dark:hover:bg-stone-300/40 group duration-150 transition-all"
          onClick={() => switchJSON("-")}
        >
          <CircleArrowLeft className="size-7 group-hover:size-9 duration-150 transition-all" />{" "}
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
          <CircleArrowRight className="size-7 group-hover:size-9 duration-150 transition-all" />{" "}
        </Button>
      </div>
      <p className="w-96 default_static p-3 text-sm text-balance text-center">
        Visit{" "}
        <a href="https://www.spotify.com/uk/account/privacy/">
          Spotify &gt; Account &gt; Privacy
        </a>{" "}
        to download a copy of your streaming data.
      </p>
    </div>
  );
}
