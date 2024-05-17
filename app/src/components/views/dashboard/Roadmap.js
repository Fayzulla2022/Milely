import React, { useEffect, useState } from "react";
import DahboardHeader from "../../layouts/DahboardHeader";
import RoadMapCard from "../../layouts/RoadMapCard";
import ROADMAPS from "../../../utils/roadmaps.json";
import { useStore } from "../../../store";

function Roadmap({ collapsed }) {
  const { keyword } = useStore((s) => s); // Accessing the keyword from the global state
  const [list, setList] = useState(ROADMAPS); // Initializing state with the roadmaps data

  useEffect(() => {
    if (keyword?.length === 0) {
      setList(ROADMAPS); // If the keyword is empty, set the list to the original roadmaps data
    } else {
      let r = [];
      for (let i = 0; i < ROADMAPS?.length; i++) {
        let currentRoadmap = ROADMAPS[i];
        // Check if the title includes the keyword and if the roadmap is not already in the list
        if (
          currentRoadmap?.title
            ?.toLowerCase()
            ?.includes(keyword?.toLowerCase()) &&
          r?.findIndex((k) => k?.id === currentRoadmap?.id) === -1
        ) {
          r.push(currentRoadmap); // Add the matching roadmap to the list
        }
      }
      setList(r); // Update the list with the filtered roadmaps
    }
  }, [keyword]); // Re-run the effect whenever the keyword changes

  return (
    <>
      <DahboardHeader name={"Roadmaps"} collapsed={collapsed} />
      <div className="mainLayout mt-3">
        <div className="roleBased">All Roadmaps</div>
        <section>
          {collapsed ? ( // Check if the layout is collapsed
            <div className="row g-3">
              {list.map((data, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                  <RoadMapCard data={data} />
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-3">
              {list.map((data, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                  <RoadMapCard data={data} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Roadmap;
