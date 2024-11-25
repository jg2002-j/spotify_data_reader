// import React from "react";
import { useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";

import json from "../data/Streaming_History_Audio_2014-2017_0.json";
import SongTile from "./SongTile";

export default function JSONReader() {
  const [loadLimit, setLoadLimit] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const startItem = (currentPage - 1) * loadLimit;
  const currentItems = json.slice(startItem, startItem + loadLimit);
  const totalPages = Math.ceil(json.length / loadLimit);

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

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">June 2024</h2>
        <div className="flex gap-5">
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
                className="w-16 text-sm origin-top-right rounded border border-white/5 bg-white/5 dark:text-stone-300 text-stone-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button
                    onClick={(e) => setLoadLimit(e.target.textContent)}
                    className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
                  >
                    15
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={(e) => setLoadLimit(e.target.textContent)}
                    className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
                  >
                    25
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={(e) => setLoadLimit(e.target.textContent)}
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
            <p>
              {currentPage} / {totalPages}
            </p>
            <Button onClick={() => nextPage()} className="px-2">
              <ArrowRightCircleIcon
                className={`size-5 ${currentPage == totalPages ? "text-stone-400 dark:text-stone-700" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto no_scrollbar flex flex-col gap-2 text-xs rounded-t rounded-ee-2xl">
        {currentItems.map((item, index) => (
          <SongTile key={index} item={item}></SongTile>
        ))}
      </div>
    </>
  );
}
