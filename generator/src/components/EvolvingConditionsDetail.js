import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import { getEvolvingConditions } from "../redux/selectors";
import { resortEvolvingConditions, updateEvolvingTime, updateEvolvingConditionValue } from "../redux/actions";
import AddEvolvingCondition from "./AddEvolvingCondition";

const EvolvingConditionsDetail = props => {

  const handleRefresh = () => {
    props.resortEvolvingConditions();
  }

  const handleUpdateTime = (timeIndex, value) => {
    props.updateEvolvingTime({
      timeIndex: timeIndex,
      value: value
    });
  }

  const handleUpdateConditionValue = (timeIndex, conditionName, value) => {
    props.updateEvolvingConditionValue({
      timeIndex: timeIndex,
      conditionName: conditionName,
      value: value
    })
  }

  return (
    <div className="card mb-4 conditions-card shadow-sm">
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-0 fw-normal">Evolving Conditions</h4>
        <AddEvolvingCondition />
      </div>
      <div className="body body-card">
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
                  <td>
                    <div onBlur={handleRefresh}>
                      <input type="text"
                             className="form-control"
                             value={time}
                             onChange={(e) => handleUpdateTime(timeIndex, e.target.value)}>
                      </input>
                    </div>
                  </td>
                  {props.conditions.values.map(({ name, values }, index) => {
                    return (
                      <td key={`condition-${timeIndex}-${index}`}>
                          <div onBlur={handleRefresh}>
                          <input type="text"
                                 className="form-control"
                                 value={values[timeIndex]}
                                 onChange={(e) => handleUpdateConditionValue(timeIndex, name, e.target.value)}>
                          </input>
                        </div>
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

const dispatchers = {
  resortEvolvingConditions,
  updateEvolvingTime,
  updateEvolvingConditionValue
}

export default connect(mapStateToProps, dispatchers)(EvolvingConditionsDetail);
