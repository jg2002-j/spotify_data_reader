import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Check, ChevronsDown, Filter } from "lucide-react";

export default function Filters({ filters, toggleSkippedFilter, timeFilter }) {
  return (
    <Menu>
      <MenuButton className="default flex items-center px-2 py-1 gap-2 text-sm">
        <Filter className="size-3" />
        <p className="text-nowrap">
          {filters.length}{" "}
          {filters.length >= 2 || filters.length == 0 ? "Filters" : "Filter"}{" "}
          applied
        </p>
        <ChevronsDown className="size-4" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="mt-2 w-64 text-sm origin-top-right rounded bg-stone-400 dark:bg-stone-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            onClick={() => toggleSkippedFilter()}
            className="group flex w-full items-center gap-3 py-2 px-3 data-[focus]:bg-white/10"
          >
            <div className="default p-1">
              <Check
                className={`size-3 fill-white ${timeFilter == 0 ? "opacity-0" : ""}`}
              />
            </div>
            <p className="text-start">Hide songs which were skipped</p>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

//inline-flex items-center gap-2 rounded bg-stone-900/20  py-1 px-2 focus:outline-none data-[hover]:bg-stone-900/30 data-[open]:bg-stone-900/30 data-[focus]:outline-1 data-[focus]:outline-white
