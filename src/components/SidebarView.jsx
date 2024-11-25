import { useEffect, useState } from "react";
import JSONReader from "./JSONReader";

function SidebarView({ selectedJSON, dateRange }) {
  const [sidebarWidth, setSidebarWidth] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarWidth(100);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`h-dvh rounded-e-3xl dark:bg-stone-300/10 bg-stone-900/10 ${sidebarWidth == 100 ? "w-full text-stone-800 dark:text-stone-300" : "w-0 text-transparent"} max-w-[500px] transition-all duration-[2500ms] flex flex-col p-5 `}
    >
      <JSONReader
        selectedJSON={selectedJSON}
        dateRange={dateRange}
      ></JSONReader>
    </div>
  );
}

export default SidebarView;
