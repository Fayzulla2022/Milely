import React, { useEffect, useState } from "react";
import DahboardHeader from "../../layouts/DahboardHeader";
import RoadMapCard from "../../layouts/RoadMapCard";
import { usePersistStore } from "../../../store";
import ROADMAPS from "../../../utils/roadmaps.json";

function Saved({ collapsed }) {
  // Get user and token from global state
  const { token, user } = usePersistStore((s) => s);
  let [list, setList] = useState([]); // State to store the list of saved roadmaps

  useEffect(() => {
    if (!token || !user) return; // If there is no token or user, return
    let favs = user?.favourites || []; // Get the user's favorite roadmaps
    let t = [];
    // Filter roadmaps to get user's favorites
    ROADMAPS.forEach((k) => {
      if (favs?.includes(k?.id)) {
        t.push(k); // Add favorite roadmaps to the list
      }
    });

    if (t?.length > 0) {
      setList(t); // Set the list state with the favorite roadmaps
    }
  }, [token, user]); // Add token and user as dependencies to re-run the effect if they change

  return (
    <>
      <DahboardHeader name={"Roadmaps"} collapsed={collapsed} />{" "}
      {/* Render the dashboard header */}
      <div className="mainLayout mt-3">
        <div className="roleBased">Your Saved Roadmaps</div>
        <section>
          {list?.length === 0 ? (
            <div className="text-white">You don't have any favourites.</div> // Display message if no favorites
          ) : (
            <>
              {collapsed ? (
                <div className="row g-4">
                  {list.map((data, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                      <RoadMapCard data={data} />{" "}
                      {/* Render each roadmap card */}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row g-4">
                  {list.map((data, index) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                      <RoadMapCard data={data} />{" "}
                      {/* Render each roadmap card */}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default Saved;
