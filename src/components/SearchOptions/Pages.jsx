import { Button, Input } from "@headlessui/react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";

export default function Pages({
  currentPage,
  updatePage,
  previousPage,
  nextPage,
  totalPages,
}) {
  return (
    <div className="flex gap-2 items-center text-sm">
      <Button onClick={() => previousPage()} className="px-2">
        <ArrowLeftCircleIcon
          className={`size-5 ${currentPage == 1 ? "text-stone-400 dark:text-stone-700" : ""}`}
        />
      </Button>
      <Input
        onChange={(e) => updatePage(e.target.value)}
        value={currentPage}
        className="padded max-w-12 text-center"
      ></Input>
      <p>/ {totalPages}</p>
      <Button onClick={() => nextPage()} className="px-2">
        <ArrowRightCircleIcon
          className={`size-5 ${currentPage == totalPages ? "text-stone-400 dark:text-stone-700" : ""}`}
        />
      </Button>
    </div>
  );
}
