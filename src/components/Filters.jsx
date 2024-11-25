import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Filters({ filters, toggleTimeFilter, timeFilter }) {
  return (
    <div className="flex gap-3 items-center text-right text-sm">
      <h4>Filters</h4>
      <Menu>
        <MenuButton className="padded flex gap-3 px-3">
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
              className="group flex w-full items-center gap-3 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
            >
              <CheckCircleIcon className="size-6" />
              <p className="text-start">
                {timeFilter != 0
                  ? `Not displaying songs that were played for ${timeFilter / 1000} seconds or less.`
                  : `Currently displaying songs played for any duration.`}
              </p>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}

//inline-flex items-center gap-2 rounded bg-stone-900/20  py-1 px-2 focus:outline-none data-[hover]:bg-stone-900/30 data-[open]:bg-stone-900/30 data-[focus]:outline-1 data-[focus]:outline-white
