import JSONReader from "./JSONReader";

function SidebarView({ selectedJSON, dateRange }) {
  return (
    <div
      className={`h-dvh noise bg-stone-900/10 dark:bg-stone-300/10 duration-300 text-stone-800 dark:text-stone-300 transition-all rounded-e-3xl max-w-[500px] flex flex-col p-5 `}
    >
      <JSONReader
        selectedJSON={selectedJSON}
        dateRange={dateRange}
      ></JSONReader>
    </div>
  );
}

export default SidebarView;
