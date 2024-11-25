import { Field, Input, Label, Button } from "@headlessui/react";
import { CalendarSearch, X } from "lucide-react";

export default function SearchDate({ searchDate, setSearchDate }) {
  return (
    <Field className="text-sm NOT_IMPLEMENTED">
      <Label className="text-xs">Search for a date.</Label>
      <div className="default flex items-center px-2 py-1 gap-2">
        <CalendarSearch className="size-4" />
        <Input
          onChange={(e) => setSearchDate(e.target.value)}
          value={searchDate}
          className="bg-transparent w-full"
        ></Input>
        <Button
          onClick={() => setSearchDate("")}
          className="default px-1 py-[0.05rem]"
        >
          <X className="size-4" />
        </Button>
      </div>
    </Field>
  );
}
