import JSONReader from "./JSONReader";

function JSONPanel({ selectedJSON, dateRange, showJSONPanel }) {
  return (
    <div
      className={`${showJSONPanel ? "w-[500px] hover:w-[520px]" : "w-0"} absolute top-0 left-0 z-50 h-dvh panel flex flex-col p-5 `}
    >
      {showJSONPanel && (
        <JSONReader
          selectedJSON={selectedJSON}
          dateRange={dateRange}
        ></JSONReader>
      )}
    </div>
  );
}

export default JSONPanel;
