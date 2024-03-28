import React, { useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { PlotsTab } from "../components/Plots";
import {
  getRunStatus,
  getSpeciesPlots,
  getReactionPlots,
  getEnvironmentPlots,
} from "../redux/selectors";
import { RunStatus } from "../controllers/models";
import { plotSpeciesUnits } from "../redux/schemas";

const Plots = (props) => {
  const SPECIES = 0;
  const REACTIONS = 1;
  const ENVIRONMENT = 2;
  const [tab, setTab] = useState(SPECIES);

  const tabSelected = "btn btn-primary btn-ncar-active";
  const tabNotSelected = "btn btn-secondary";

  return (
    <Layout title={"Plots"}>
      <div className="container text-center">
        {props.runStatus === RunStatus.DONE ? (
          <>
            <div className="navbox pt-2">
              <button
                className={tab === SPECIES ? tabSelected : tabNotSelected}
                onClick={() => setTab(SPECIES)}
              >
                Chemical species
              </button>
              <button
                className={tab === REACTIONS ? tabSelected : tabNotSelected}
                onClick={() => setTab(REACTIONS)}
              >
                Reaction rates
              </button>
              <button
                className={tab === ENVIRONMENT ? tabSelected : tabNotSelected}
                onClick={() => setTab(ENVIRONMENT)}
              >
                Environmental conditions
              </button>
            </div>
            {tab === SPECIES ? (
              <PlotsTab
                plotType="species"
                availablePlots={props.speciesPlots}
                units={plotSpeciesUnits}
              />
            ) : null}
            {tab === REACTIONS ? (
              <PlotsTab
                plotType="reactions"
                availablePlots={props.reactionPlots}
                units={plotSpeciesUnits}
              />
            ) : null}
            {tab === ENVIRONMENT ? (
              <PlotsTab
                plotType="environment"
                availablePlots={props.environmentPlots}
              />
            ) : null}
          </>
        ) : (
          <p> Plots will be available once a model run has been completed </p>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    runStatus: getRunStatus(state),
    speciesPlots: getSpeciesPlots(state),
    reactionPlots: getReactionPlots(state),
    environmentPlots: getEnvironmentPlots(state),
  };
};

export default connect(mapStateToProps)(Plots);
