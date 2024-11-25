import { Button, Input } from "@headlessui/react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

export default function Pages({ currentPage, setCurrentPage, totalPages }) {
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

  return (
    <div className="flex gap-2 items-center text-sm">
      <Button onClick={() => previousPage()} className="px-2">
        <CircleArrowLeft
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
        <CircleArrowRight
          className={`size-5 ${currentPage == totalPages ? "text-stone-400 dark:text-stone-700" : ""}`}
        />
      </Button>
    </div>
  );
}
