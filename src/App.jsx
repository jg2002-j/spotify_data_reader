import { useEffect, useState, Suspense } from "react";
import { Button } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useImage } from "react-image";

import "./App.css";
import SidebarView from "./components/SidebarView";

const jsonFiles = import.meta.glob("./data/*.json");

function App() {
  const getLocalStorageValue = (key, defaultValue) => {
    try {
      const localStorageValue = localStorage.getItem(key);
      return localStorageValue !== null
        ? JSON.parse(localStorageValue)
        : defaultValue;
    } catch (err) {
      console.error("Error parsing localStorage value: " + err);
      return defaultValue;
    }
  };

  const [count, setCount] = useState(getLocalStorageValue("count", 1));
  const [darkMode, setDarkMode] = useState(true);
  const [jsonFileArray, setJsonFileArray] = useState([]);
  const [selectedJSON, setSelectedJSON] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark");
      // console.log("dark mode");
    } else {
      document.querySelector("html").classList.remove("dark");
      // console.log("light mode");
    }
  }, [darkMode]);

  const FullSpotifyLogo = ({ darkMode }) => {
    const imageSource = darkMode
      ? "../Full_Logo_Green_RGB.svg"
      : "../Full_Logo_Black_RGB.svg";
    const { src } = useImage({
      srcList: [imageSource],
    });

    return <img alt="Spotify Logo" src={src} />;
  };

  // load jsonFileArray on component render
  useEffect(() => {
    const loadFiles = async () => {
      const jsonList = [];
      for (const path in jsonFiles) {
        const jsonFile = await jsonFiles[path]();
        jsonList.push(jsonFile);
      }
      setJsonFileArray(jsonList);
    };
    loadFiles();
  }, []);

  // once jsonFileArray is not empty, choose a JSON to load by default
  // modules: https://vite.dev/guide/features#glob-import
  useEffect(() => {
    if (jsonFileArray.length > 0) {
      setSelectedJSON(jsonFileArray[count].default);
    }
  }, [count, jsonFileArray]);

  const switchJSON = () => {
    if (count + 1 < jsonFileArray.length) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };

  // persist count to local storage
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  //TODO: consider not importing and storing all the jsons (important for when there are a bazillion)

  return (
    <>
      <div className="absolute top-10 right-10 flex gap-2 transition-all duration-1000">
        <Button
          onClick={() => setDarkMode((previous) => !previous)}
          className="cursor-pointer px-4 py-2 rounded bg-black/10 dark:bg-white/10 p-1 ring-1 ring-black/15 dark:ring-white/15 ring-inset"
        >
          <MoonIcon className="size-4 fill-black dark:fill-white block dark:hidden" />
          <SunIcon className="size-4 fill-black dark:fill-white hidden dark:block" />
        </Button>
      </div>

      <div className="bg-stone-300 dark:bg-stone-900 py-10 h-dvh w-vw flex gap-2 items-center justify-center transition-all duration-1000">
        {selectedJSON && <SidebarView selectedJSON={selectedJSON} />}
        <div className="w-[50vw] flex flex-col gap-5 items-center me-5 ">
          <div className="w-full max-w-96">
            <Suspense
              fallback={
                <h2 className="text-stone-600 font-extrabold">Loading...</h2>
              }
            >
              <FullSpotifyLogo darkMode={darkMode} />
            </Suspense>
          </div>
          <h1 className="text-3xl font-bold select-none">
            Spotify JSON Reader
          </h1>
          <div className="flex gap-5 items-center">
            <Button
              className="inline-flex items-center gap-2 rounded-md bg-stone-500 dark:bg-stone-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-stone-600 data-[open]:bg-stone-700 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={() => switchJSON()}
            >
              count is {count}
            </Button>
          </div>
          <p className="dark:bg-stone-300/10 bg-stone-900/10 p-3 rounded text-lg max-w-96 text-center">
            Visit{" "}
            <a href="https://www.spotify.com/uk/account/privacy/">
              Spotify &gt; Account &gt; Privacy
            </a>{" "}
            to download a copy of your streaming data.
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
