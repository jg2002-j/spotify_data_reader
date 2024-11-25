/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function SidebarView({ showSidebar }) {
  const [sidebarWidth, setSidebarWidth] = useState(20);

  useEffect(() => {
    if (showSidebar === true) setSidebarWidth(100);
  }, [showSidebar]);

  useEffect(() => {
    console.log(`sideBarWidth is ${sidebarWidth}`);
  }, [sidebarWidth]);

  return (
    <div
      className={`h-dvh border-2 max-w-[50vw] transition-all duration-1000`}
      style={{ width: `${sidebarWidth}%` }}
    ></div>
  );
}

export default SidebarView;
