import React from "react";
import { connect } from "react-redux";
import { getGasSpecies } from "../selectors";

const GasSpeciesDetail = ({ species }) => {
    return (
        <div className="card mb-4 species-card shadow-sm" species={species.name}>
            <div className="card-header">
                <h4 className="my-0 fw-normal">{species.name}</h4>
            </div>
            <form className="body card-body">
                <div className="form-group properties">
                </div>
                <div className="container text-center mt-3">
                    <button type="button" className="btn btn-secondary btn-cancel">Close</button>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    const species = getGasSpecies(state);
    return species;
};

export default connect(mapStateToProps)(GasSpeciesDetail);
