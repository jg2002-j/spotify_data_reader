/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function SidebarView() {
  const [sidebarWidth, setSidebarWidth] = useState(0);

  useEffect(() => {
    console.log("hi im here now");
    const timer = setTimeout(() => {
      setSidebarWidth(100);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`h-dvh border-2 ${sidebarWidth == 100 ? "w-full" : "w-0"} max-w-[50vw] transition-all duration-1000 flex flex-col gap-10 p-5 text-stone-800 dark:text-stone-300`}
    >
      <h2 className="text-2xl font-bold">June 2024</h2>
    </div>
  );
}

export default SidebarView;
