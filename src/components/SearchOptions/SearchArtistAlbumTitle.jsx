import { Description, Field, Input, Label, Button } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";

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
        <MagnifyingGlassIcon className="size-4" />
        <Input
          onChange={(e) => setSearchGeneric(e.target.value)}
          value={searchGeneric}
          className="bg-transparent w-full"
        ></Input>
        <Button
          onClick={() => setSearchGeneric("")}
          className="default px-1 py-[0.05rem]"
        >
          <XMarkIcon className="size-4" />
        </Button>
      </div>
    </Field>
  );
}
