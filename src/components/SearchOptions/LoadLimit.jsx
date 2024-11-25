import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function LoadLimit({ loadLimit, setLoadLimit }) {
  return (
    <div className="flex gap-3 items-center text-right text-sm">
      <h4>Show</h4>
      <Menu>
        <MenuButton className="padded flex gap-2">
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
              onClick={(e) => setLoadLimit(JSON.parse(e.target.textContent))}
              className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
            >
              10
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={(e) => setLoadLimit(JSON.parse(e.target.textContent))}
              className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
            >
              15
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={(e) => setLoadLimit(JSON.parse(e.target.textContent))}
              className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
            >
              25
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={(e) => setLoadLimit(JSON.parse(e.target.textContent))}
              className="group flex w-full items-center gap-2 rounded py-[0.125rem] px-3 data-[focus]:bg-white/10"
            >
              35
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
