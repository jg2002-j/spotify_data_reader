import { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Input,
} from "@headlessui/react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";

import jsonFile from "../data/Streaming_History_Audio_2014-2017_0.json";
import SongTile from "./SongTile";

export default function JSONReader() {
  const firstStreamTimeStamp = jsonFile[0].ts;
  const firstStreamDate = new Date(firstStreamTimeStamp);
  const startDate = firstStreamDate.toLocaleDateString();

  const lastStreamTimeStamp = jsonFile[jsonFile.length - 1].ts;
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
    const totalFilteredItems = jsonFile.filter(
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
          <div className="flex gap-3 items-center text-right text-sm">
            <h4>Filters</h4>
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded bg-stone-900/20  py-1 px-2 focus:outline-none data-[hover]:bg-stone-900/30 data-[open]:bg-stone-900/30 data-[focus]:outline-1 data-[focus]:outline-white">
                {filters.length}
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="w-64 text-sm origin-top-right rounded border border-white/5 bg-stone-300/90 dark:bg-stone-900/90 dark:text-stone-300 text-stone-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button
                    onClick={() => toggleTimeFilter()}
                    className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
                  >
                    <CheckCircleIcon className="size-6" />
                    <p>
                      {timeFilter != 0
                        ? `Not displaying songs that were played for ${timeFilter / 1000} seconds or less.`
                        : `Currently displaying songs played for any duration.`}
                    </p>
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div className="flex gap-3 items-center text-right text-sm">
            <h4>Show</h4>
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded bg-stone-900/20  py-1 px-2 focus:outline-none data-[hover]:bg-stone-900/30 data-[open]:bg-stone-900/30 data-[focus]:outline-1 data-[focus]:outline-white">
                {loadLimit}
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="w-16 text-sm origin-top-right rounded border border-white/5 bg-stone-300/90 dark:bg-stone-900/90 dark:text-stone-300 text-stone-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button
                    onClick={(e) =>
                      setLoadLimit(JSON.parse(e.target.textContent))
                    }
                    className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
                  >
                    15
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={(e) =>
                      setLoadLimit(JSON.parse(e.target.textContent))
                    }
                    className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
                  >
                    25
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={(e) =>
                      setLoadLimit(JSON.parse(e.target.textContent))
                    }
                    className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
                  >
                    35
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <Button onClick={() => previousPage()} className="px-2">
              <ArrowLeftCircleIcon
                className={`size-5 ${currentPage == 1 ? "text-stone-400 dark:text-stone-700" : ""}`}
              />
            </Button>
            <Input
              onChange={(e) => updatePage(e.target.value)}
              value={currentPage}
              className="padded max-w-10"
            ></Input>
            <p>/ {totalPages}</p>
            <Button onClick={() => nextPage()} className="px-2">
              <ArrowRightCircleIcon
                className={`size-5 ${currentPage == totalPages ? "text-stone-400 dark:text-stone-700" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto no_scrollbar flex flex-col gap-2 text-xs rounded-t rounded-ee-2xl">
        {mapJSON()}
      </div>
    </>
  );
}
