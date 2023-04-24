import React from "react";
import { connect } from "react-redux";
import { getEvolvingConditions } from "../redux/selectors";

const EvolvingConditionsDetail = props => {

  return (
    <div className="card mb-4 conditions-card shadow-sm">
      <div className="card-header">
        <h4 className="my-0 fw-normal">Evolving Conditions</h4>
      </div>
      <div className="body card-body">
        Evolving conditions table
      </div>
    </div>
  );
}

export default connect()(EvolvingConditionsDetail);
