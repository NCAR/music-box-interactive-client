import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import { getEvolvingConditions } from "../redux/selectors";
import { updateEvolvingConditions } from "../redux/actions";

const EvolvingConditionsDetail = props => {

  const handleUpdateConditionValue = (timeIndex, columnName, value) => {
    props.updateEvolvingConditions({
      ...props.conditions,
      values: [
        ...props.conditions.values.map((condition, index) =>
          condition.name !== columnName ?
          condition :
          {
            ...condition,
            values: [
              ...condition.values.slice(0,timeIndex),
              value,
              ...condition.values.slice(timeIndex+1)
            ]
          }
        )
      ]
    })
  }

  return (
    <div className="card mb-4 conditions-card shadow-sm">
      <div className="card-header">
        <h4 className="my-0 fw-normal">Evolving Conditions</h4>
      </div>
      <div className="body card-body">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>time</th>
              {props.conditions.values.map(({ name }, index) => {
                return (
                  <th className="fw-bold" key={`column-${index}`}>{name}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {props.conditions.times.map((time, timeIndex) => {
              return (
                <tr key={`condition-time-${timeIndex}`}>
                  <td>{time}</td>
                  {props.conditions.values.map(({ name, values }, index) => {
                    return (
                      <td key={`condition-${timeIndex}-${index}`}>
                        <input type="text"
                               className="form-control"
                               defaultValue={values[timeIndex]}
                               onBlur={(e) => handleUpdateConditionValue(timeIndex, name, e.target.value)}>
                        </input>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { conditions: getEvolvingConditions(state) }
}

export default connect(mapStateToProps, { updateEvolvingConditions })(EvolvingConditionsDetail);
