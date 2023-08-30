import React, { useState } from "react";
import { connect } from "react-redux";
import GasSpeciesDetail from "./GasSpeciesDetail.js";
import GasSpeciesList from "./GasSpeciesList.js";
import SpeciesInstruction from "./SpeciesInstruction.js";

function GasSpeciesTab() {

  const [detailSpecies, setDetailSpecies] = useState({ });

  return (
    <>
      <SpeciesInstruction />
      <div id="species-content" className="container-fluid p-2 d-flex flex-column overflow-hidden">
        <div className="row flex-grow-1 overflow-hidden">
          <div className="col-md-4 col-lg-4 mh-100 overflow-auto">
            <div className="row flex-shrink-0">
              <div className="col">
                <GasSpeciesList detailSpecies={detailSpecies}
                                setDetailSpecies={setDetailSpecies}/>
              </div>
            </div>
          </div>
          <div className="col mh-100 overflow-auto">
            <div className="row flex-shrink-0">
              <div className="col species-detail">
                {Object.keys(detailSpecies).map(key => {
                   return <GasSpeciesDetail species={detailSpecies[key]}
                                            key={key}
                                            detailSpecies={detailSpecies}
                                            setDetailSpecies={setDetailSpecies}/>;
                 })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect()(GasSpeciesTab);
