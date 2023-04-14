import React from "react";
import { connect } from "react-redux";
import AddGasSpecies from "./AddGasSpecies";

function GasSpeciesList(props) {

  return (
    <div className="container-fluid p-2 d-flex flex-column vh-100 overflow-hidden">
      <div className="row flex-grow-1 overflow-hidden">
        <div className="col-md-4 col-lg-4 mh-100 overflow-auto">
          <div className="row flex-shrink-0">
            <div className="col">
              <nav className="bg-ncar-menu-secondary p-2">
                <AddGasSpecies />
                <ul className="list-group species-list" id="species_list">
                  {null}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default connect()(GasSpeciesList);
