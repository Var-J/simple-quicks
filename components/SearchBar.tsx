import React from "react";
import { SlMagnifier } from "react-icons/sl";

function SearchBar() {
  return (
    <div className="w-full h-14 px-6 space-x-4 bg-[#4f4f4f] flex items-center text-white">
      <SlMagnifier className="h-4 w-4"/>
      <input type="text" className="bg-transparent h-full w-full focus:outline-none" />
    </div>
  );
}

export default SearchBar;
