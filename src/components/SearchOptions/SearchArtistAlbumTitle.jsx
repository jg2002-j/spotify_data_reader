import { Description, Field, Input, Label, Button } from "@headlessui/react";
import { Search, X } from "lucide-react";

export default function SearchArtistAlbumTitle({
  searchGeneric,
  setSearchGeneric,
}) {
  return (
    <Field className="text-sm">
      <Label>Search for an artist, song or album name</Label>
      <Description className="flex items-center px-2 py-1 gap-2">
        {searchGeneric}
      </Description>
      <div className="default flex items-center px-2 py-1 gap-2">
        <Search className="size-4" />
        <Input
          onChange={(e) => setSearchGeneric(e.target.value)}
          value={searchGeneric}
          className="bg-transparent w-full"
        ></Input>
        <Button
          onClick={() => setSearchGeneric("")}
          className="default px-1 py-[0.05rem]"
        >
          <X className="size-4" />
        </Button>
      </div>
    </Field>
  );
}
