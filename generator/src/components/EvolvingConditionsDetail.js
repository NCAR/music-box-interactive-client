import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import { getEvolvingConditions } from "../redux/selectors";

const EvolvingConditionsDetail = props => {

  return (
    <div className="card mb-4 conditions-card shadow-sm">
      <div className="card-header">
        <h4 className="my-0 fw-normal">Evolving Conditions</h4>
      </div>
      <div className="body card-body">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>time</th>
              {props.conditions.values.map(({ name }, index) => {
                return (
                  <th key={`column-${index}`}>{name}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { conditions: getEvolvingConditions(state) }
}

export default connect(mapStateToProps)(EvolvingConditionsDetail);
