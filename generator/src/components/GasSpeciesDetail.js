import React from "react";
import { connect } from "react-redux";
import { getMechanism } from "../redux/selectors";
import PropertyList from "./PropertyList";

const GasSpeciesDetail = ({ species, detailSpecies, setDetailSpecies }) => {
  const handleClick = (e) => {
    e.preventDefault();
    let newDetailSpecies = { ...detailSpecies };
    delete newDetailSpecies[species.name];
    setDetailSpecies(newDetailSpecies);
  }

  return (
    <div className="card mb-4 species-card shadow-sm" species={species.name}>
      <div className="card-header">
        <h4 className="my-0 fw-normal">{species.name}</h4>
      </div>
      <form className="body card-body">
        <PropertyList speciesName={species.name} />
        <div className="container text-center mt-3">
          <button type="button"
                  className="btn btn-secondary btn-cancel"
                  onClick={handleClick}>Close</button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
    const mechanism = getMechanism(state);
    return mechanism;
};

export default connect(mapStateToProps)(GasSpeciesDetail);
