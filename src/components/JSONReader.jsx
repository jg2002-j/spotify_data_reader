import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";
import SongTile from "./SongTile";
import Pages from "./SearchOptions/Pages";
import SearchOptions from "./SearchOptions";

export default function JSONReader({ selectedJSON, dateRange }) {
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

  // useState with () => for lazy initialisation
  const [showOptionsPanel, setShowOptionsPanel] = useState(
    getLocalStorageValue("showOptionsPanel", false)
  );
  const [loadLimit, setLoadLimit] = useState(() =>
    getLocalStorageValue("loadLimit", 15)
  );
  const [currentPage, setCurrentPage] = useState(() =>
    getLocalStorageValue("currentPage", 1)
  );
  const [filterSkippedSongs, setFilterSkippedSongs] = useState(() =>
    getLocalStorageValue("filterSkippedSongs", true)
  );

  const [filters, setFilters] = useState([]);

  const [totalItemsToDisplay, SetTotalItemsToDisplay] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const startItem = (currentPage - 1) * loadLimit;
  const totalPages = Math.ceil(totalItemsToDisplay.length / loadLimit);

  // persist user options to local storage
  useEffect(() => {
    localStorage.setItem("showOptionsPanel", JSON.stringify(showOptionsPanel));
  }, [showOptionsPanel]);

  useEffect(() => {
    localStorage.setItem("loadLimit", JSON.stringify(loadLimit));
  }, [loadLimit]);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem(
      "filterSkippedSongs",
      JSON.stringify(filterSkippedSongs)
    );
  }, [filterSkippedSongs]);

  // filters
  const toggleSkippedFilter = () => {
    setFilterSkippedSongs((filterSkippedSongs) => !filterSkippedSongs);
  };

  // page navigation functions
  const previousPage = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const updatePage = (target) => {
    if (target > 0 && target <= totalPages) {
      setCurrentPage(JSON.parse(target));
    }
  };

  // useEffect to update the total list of items to display through ALL pages
  // changes when timeFilter (or any other filters) change
  useEffect(() => {
    const totalFilteredItems = selectedJSON.filter((item) => {
      if (filterSkippedSongs) {
        return item.skipped != true && item.ms_played >= 30000;
      } else {
        return true;
      }
    });
    SetTotalItemsToDisplay(totalFilteredItems);
  }, [filterSkippedSongs, selectedJSON]);

  // useEffect to refresh the current list of items loaded on the CURRENT page
  // changes when startItem, loadLimit (where in the list user is positioned) or totalItemsToDisplay (total list contents) change
  useEffect(() => {
    const updatedItems = totalItemsToDisplay.slice(
      startItem,
      startItem + loadLimit
    );
    setCurrentItems(updatedItems);
  }, [totalItemsToDisplay, startItem, loadLimit]);

  // update filters array state when filters are added
  useEffect(() => {
    if (filterSkippedSongs) {
      if (!filters.includes("skippedSongs")) {
        setFilters((prevFilters) => [...prevFilters, "skippedSongs"]);
      }
    } else {
      if (filters.includes("skippedSongs")) {
        setFilters((prevFilters) =>
          prevFilters.filter((filter) => filter !== "skippedSongs")
        );
      }
    }
  }, [filterSkippedSongs, filters]);

  const mapJSON = () => {
    return currentItems.map((item, index) => {
      return <SongTile key={index} item={item} index={index} />;
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">{dateRange}</h2>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <div className="flex gap-3">
          <Button
            className={`default px-2 py-1 text-sm ${showOptionsPanel ? "bg-stone-900/30 dark:bg-stone-300/30 ring-1 ring-stone-900 dark:ring-stone-300" : ""}`}
            onClick={() =>
              setShowOptionsPanel((showOptionsPanel) => !showOptionsPanel)
            }
          >
            Show options
          </Button>
          {showOptionsPanel && (
            <SearchOptions
              filters={filters}
              toggleSkippedFilter={toggleSkippedFilter}
              filterSkippedSongs={filterSkippedSongs}
              loadLimit={loadLimit}
              setLoadLimit={setLoadLimit}
            />
          )}
        </div>
        <Pages
          currentPage={currentPage}
          updatePage={updatePage}
          nextPage={nextPage}
          previousPage={previousPage}
          totalPages={totalPages}
        />
      </div>

      <div className="overflow-y-auto no_scrollbar flex flex-col items-center gap-2 text-xs rounded-t rounded-ee-2xl">
        {mapJSON()}
        <Pages
          currentPage={currentPage}
          updatePage={updatePage}
          nextPage={nextPage}
          previousPage={previousPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
