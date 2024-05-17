import React from "react";
import { useStore } from "../../store";

// DashboardHeader component to display the header with a search bar
function DahboardHeader({ name }) {
  // Using Zustand store to get and set the search keyword
  const { keyword, setKeyword } = useStore((s) => s);

  return (
    <>
      <div className="searchMain d-flex justify-content-between align-items-center w-100">
        {/* Displaying the name passed as a prop */}
        <h3>{name}</h3>
        <div className="searchBar input-group">
          <img src="/assets/imgs/search.svg" alt="" />
          {/* Search input to filter dashboard items */}
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default DahboardHeader;
