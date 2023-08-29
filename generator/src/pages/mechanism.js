import React, { useState } from "react";
import { connect } from 'react-redux';
import Layout from "../components/Layout";
import { GasSpeciesTab, ReactionsTab, AerosolSpeciesTab } from "../components/Mechanism";

function Mechanism(props) {
  const SPECIES = 0
  const REACTIONS = 1
  const AEROSOL = 2
  const [param, setParam] = useState(SPECIES)

  const paramSelected = "btn btn-primary btn-ncar-active"
  const paramNotSelected = "btn btn-secondary"

  return (
    <Layout>
      <main role="main">
        <div className="container text-center">
          <div className="navbox pt-2">
            <button className={param === SPECIES ?  paramSelected : paramNotSelected} onClick={() => setParam(SPECIES)}>
              Gas Species
            </button>
            <button className={param === AEROSOL ?  paramSelected : paramNotSelected} onClick={() => setParam(AEROSOL)}>
              Aerosol Species
            </button>
            <button className={param === REACTIONS ? paramSelected : paramNotSelected} onClick={() => setParam(REACTIONS)}>Reactions</button>
          </div>
        </div>
        {param === SPECIES ? <GasSpeciesTab /> : null}
        {param == AEROSOL ? <AerosolSpeciesTab /> : null}
        {param === REACTIONS ? <ReactionsTab /> : null}
      </main>
    </Layout>
  );
}

export default connect()(Mechanism)
