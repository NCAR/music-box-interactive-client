import React, { useState } from "react";
import { connect } from 'react-redux';
import Layout from "../components/Layout";
import GasSpeciesTab from "../components/GasSpeciesTab.js";
import ReactionsTab from "../components/ReactionsTab.js";

function Mechanism(props) {
  const SPECIES = 0
  const REACTIONS = 1
  const [param, setParam] = useState(SPECIES)

  const paramSelected = "btn btn-primary btn-ncar-active"
  const paramNotSelected = "btn btn-secondary"

  return (
    <Layout>
      <main role="main">
        <div className="container text-center">
          <div className="pt-3">
            <button className={param === SPECIES ?  paramSelected : paramNotSelected} onClick={() => setParam(SPECIES)}>
              Gas Species
            </button>
            <button className={param === REACTIONS ? paramSelected : paramNotSelected} onClick={() => setParam(REACTIONS)}>Reactions</button>
          </div>
        </div>
        {param === SPECIES ? <GasSpeciesTab /> : null}
        {param === REACTIONS ? <ReactionsTab /> : null}
      </main>
    </Layout>
  );
}

export default connect()(Mechanism)
