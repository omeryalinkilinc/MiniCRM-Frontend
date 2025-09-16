"use client";
import React, { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = ["Dashboard", "Customers", "Reports", "Settings"];

  return (
    <div className="bg-[#4c8ae3] w-[250px] h-screen ">
      <div className="flex flex-col items-center">
        <div className="p-4 pt-[28px]">
          <h1 className="font-bold text-white text-2xl">MiniCRM</h1>
        </div>
        <div className="text-white text-xl w-full">
          <ul className="flex flex-col gap-4 w-full px-4">
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => setActive(item)}
                className={`w-full pl-4 py-2 rounded cursor-pointer text-white text-lg text-left font-semibold
              ${active === item ? "bg-[#70a1e8]" : "hover:bg-blue-400"}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
