import { useState, useEffect } from "react";

import SongTile from "./SongTile";
import Filters from "./Filters";
import Show from "./Show";
import Pages from "./Pages";

export default function JSONReader({ selectedJSON }) {
  const firstStreamTimeStamp = selectedJSON[0].ts;
  const firstStreamDate = new Date(firstStreamTimeStamp);
  const startDate = firstStreamDate.toLocaleDateString();

  const lastStreamTimeStamp = selectedJSON[selectedJSON.length - 1].ts;
  const lastStreamDate = new Date(lastStreamTimeStamp);
  const endDate = lastStreamDate.toLocaleDateString();

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
  const [loadLimit, setLoadLimit] = useState(() =>
    getLocalStorageValue("loadLimit", 15)
  );
  const [currentPage, setCurrentPage] = useState(() =>
    getLocalStorageValue("currentPage", 1)
  );
  const [timeFilter, setTimeFilter] = useState(() =>
    getLocalStorageValue("timeFilter", 10000)
  );

  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState([timeFilter]);

  const [totalItemsToDisplay, SetTotalItemsToDisplay] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const startItem = (currentPage - 1) * loadLimit;
  const totalPages = Math.ceil(totalItemsToDisplay.length / loadLimit);

  // persist user options to local storage
  useEffect(() => {
    localStorage.setItem("loadLimit", JSON.stringify(loadLimit));
  }, [loadLimit]);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("timeFilter", JSON.stringify(timeFilter));
  }, [timeFilter]);

  // filters
  const toggleTimeFilter = () => {
    switch (timeFilter) {
      case 10000:
        setTimeFilter(20000);
        break;
      case 20000:
        setTimeFilter(30000);
        break;
      case 30000:
        setTimeFilter(0);
        break;
      case 0:
        setTimeFilter(10000);
        break;
      default:
        break;
    }
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
    const totalFilteredItems = selectedJSON.filter(
      (item) => item.ms_played >= timeFilter
    );
    SetTotalItemsToDisplay(totalFilteredItems);
  }, [timeFilter]);

  // useEffect to refresh the current list of items loaded on the CURRENT page
  // changes when startItem, loadLimit (where in the list user is positioned) or totalItemsToDisplay (total list contents) change
  useEffect(() => {
    const updatedItems = totalItemsToDisplay.slice(
      startItem,
      startItem + loadLimit
    );
    setCurrentItems(updatedItems);
  }, [totalItemsToDisplay, startItem, loadLimit]);

  const mapJSON = () => {
    return currentItems.map((item, index) => {
      return <SongTile key={index} item={item} index={index} />;
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">{`${startDate} to ${endDate}`}</h2>
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-5">
          <Filters
            filters={filters}
            toggleTimeFilter={toggleTimeFilter}
            timeFilter={timeFilter}
          />
          <Show loadLimit={loadLimit} setLoadLimit={setLoadLimit} />
          <Pages
            currentPage={currentPage}
            updatePage={updatePage}
            nextPage={nextPage}
            previousPage={previousPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      <div className="overflow-y-auto no_scrollbar flex flex-col gap-2 text-xs rounded-t rounded-ee-2xl">
        {mapJSON()}
      </div>
    </>
  );
}
