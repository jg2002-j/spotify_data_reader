import { useEffect } from "react";
import { Button } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark");
      // console.log("dark mode");
    } else {
      document.querySelector("html").classList.remove("dark");
      // console.log("light mode");
    }
  }, [darkMode]);

  return (
    <div className="absolute top-10 right-10 flex gap-2 default">
      <Button
        onClick={() => setDarkMode((previous) => !previous)}
        className="cursor-pointer px-4 py-2 rounded bg-black/10 dark:bg-white/10 p-1 ring-1 ring-black/15 dark:ring-white/15 ring-inset"
      >
        <MoonIcon className="size-4 fill-black dark:fill-white hidden dark:block" />
        <SunIcon className="size-4 fill-black dark:fill-white block dark:hidden" />
      </Button>
    </div>
  );
}