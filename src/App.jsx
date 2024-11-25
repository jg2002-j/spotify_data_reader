import { useState } from "react";
import { Button, Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="">
      <h1>Spotify JSON Reader</h1>
      <div className="bg-black">
        <Button
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <Checkbox
          checked={enabled}
          onChange={setEnabled}
          className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
        >
          <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
        </Checkbox>
      </div>
    </div>
  );
}

export default App;
