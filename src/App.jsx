import { useEffect, useState } from "react";

import "./App.css";
import JSONPanel from "./components/JSONPanel";
import MainMenu from "./components/MainMenu";
import DarkModeToggle from "./components/DarkModeToggle";
import StatsPanel from "./components/StatsPanel";

const jsonFiles = import.meta.glob("./data/*.json");

// TODO: error handle if the local storage saved values are out of range (e.g. index referring to a JSON that doesn't exist in the array)

function App() {
  // retrieve values from local storage, with a fallback value if not set
  const getLocalStorageValue = (key, defaultValue) => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (!localStorageValue) {
        return defaultValue;
      } else {
        return JSON.parse(localStorageValue);
      }
    } catch (err) {
      console.error("Error parsing localStorage value: " + err);
      return defaultValue;
    }
  };

  // states
  const [index, setIndex] = useState(getLocalStorageValue("index", 0));
  const [jsonFileArray, setJsonFileArray] = useState([]);
  const [selectedJSON, setSelectedJSON] = useState(null);
  const [darkMode, setDarkMode] = useState(
    getLocalStorageValue("darkMode", true)
  );

  // persist values to local storage
  useEffect(() => {
    localStorage.setItem("index", JSON.stringify(index));
  }, [index]);
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // load jsonFileArray on component first render
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
      setSelectedJSON(jsonFileArray[index].default);
    }
  }, [index, jsonFileArray]);

  const switchJSON = (direction) => {
    if (direction == "+") {
      if (index + 1 < jsonFileArray.length) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    } else {
      if (index - 1 >= 0) {
        setIndex(index - 1);
      } else {
        setIndex(jsonFileArray.length - 1);
      }
    }
  };

  const getJSONDateRange = () => {
    if (!selectedJSON || selectedJSON.length === 0) {
      return "Loading...";
    } else {
      const options = { year: "numeric", month: "short" };
      const startDate = new Date(selectedJSON[0].ts);
      const startReadableDate = startDate.toLocaleDateString("en-GB", options);
      const endDate = new Date(selectedJSON[selectedJSON.length - 1].ts);
      const endReadableDate = endDate.toLocaleDateString("en-GB", options);
      return `${startReadableDate} to ${endReadableDate}`;
    }
  };

  return (
    <>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="noise bg-stone-300 dark:bg-stone-900 h-dvh w-vw transition-all duration-1000 flex items-center justify-center">
        <div className="w-full border-[1px] border-red-600 max-w-[2200px] flex items-center justify-between">
          <div className="w-[60%] flex justify-start items-center">
            {selectedJSON && (
              <JSONPanel
                selectedJSON={selectedJSON}
                dateRange={getJSONDateRange()}
              />
            )}
            {selectedJSON && <StatsPanel selectedJSON={selectedJSON} />}
          </div>
          <MainMenu
            switchJSON={switchJSON}
            jsonFileArray={jsonFileArray}
            index={index}
            dateRange={getJSONDateRange()}
            darkMode={darkMode}
          />
        </div>
      </div>
    </>
  );
}

export default App;
