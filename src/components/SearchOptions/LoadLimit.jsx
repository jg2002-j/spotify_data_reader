import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  SquaresPlusIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";

export default function LoadLimit({ loadLimit, setLoadLimit }) {
  return (
    <Menu>
      <MenuButton className="default flex items-center px-2 py-1 gap-2 text-sm">
        <SquaresPlusIcon className="size-3" />
        <p className="text-nowrap">{`Showing ${loadLimit} items`}</p>
        <ChevronDownIcon className="size-4" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="mt-2 w-24 text-sm origin-top-right rounded bg-stone-400 dark:bg-stone-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            onClick={() => setLoadLimit(10)}
            className="group flex w-full items-center gap-3 py-2 px-3 data-[focus]:bg-white/10"
          >
            <div className="default p-1">
              <CheckCircleIcon
                className={`size-3 fill-white ${loadLimit != 10 ? "opacity-0" : ""}`}
              />
            </div>
            <p className="text-start">10</p>
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => setLoadLimit(25)}
            className="group flex w-full items-center gap-3 py-2 px-3 data-[focus]:bg-white/10"
          >
            <div className="default p-1">
              <CheckCircleIcon
                className={`size-3 fill-white ${loadLimit != 25 ? "opacity-0" : ""}`}
              />
            </div>
            <p className="text-start">25</p>
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => setLoadLimit(50)}
            className="group flex w-full items-center gap-3 py-2 px-3 data-[focus]:bg-white/10"
          >
            <div className="default p-1">
              <CheckCircleIcon
                className={`size-3 fill-white ${loadLimit != 50 ? "opacity-0" : ""}`}
              />
            </div>
            <p className="text-start">50</p>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
