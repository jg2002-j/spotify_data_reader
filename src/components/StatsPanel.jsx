// import React from "react";

export default function StatsPanel({
  selectedJSON,
  showJSONPanel,
  showStatsPanel,
}) {
  return (
    <div
      className={`${showJSONPanel ? "w-[1000px] hover:w-[1020px]" : "w-[500px] hover:w-[520px]"} h-dvh panel group flex`}
    >
      <div className={`${showJSONPanel ? "w-[500px]" : "w-10"}`}></div>
      <div className="w-[500px] group-hover:w-[520px] flex flex-col p-5">
        <h3>Hello</h3>
      </div>
    </div>
  );
}
