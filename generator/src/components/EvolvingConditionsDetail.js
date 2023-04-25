import React, { useState } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import { getEvolvingConditions } from "../redux/selectors";
import { updateEvolvingConditions } from "../redux/actions";

const EvolvingConditionsDetail = props => {

  const handleRefresh = () => {
    const conditions = props.conditions
    const compareTime = (a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
    const sortOrder = conditions.times.map((time, index) => {
      return { time: parseFloat(time), index: index }
    }).sort( compareTime ).map(({ index }) => index);
    props.updateEvolvingConditions({
      ...conditions,
      times: conditions.times.map((_, index) => parseFloat(conditions.times[sortOrder[index]])),
      values: conditions.values.map(condition => {
        return {
          ...condition,
          values: condition.values.map((_, index) => parseFloat(condition.values[sortOrder[index]]))
        }
      })
    });
  }

  const handleUpdateTime = (timeIndex, value) => {
    const conditions = { ...props.conditions }
    const times = [
      ...conditions.times.slice(0,timeIndex),
      value,
      ...conditions.times.slice(timeIndex+1)
    ]
    props.updateEvolvingConditions({
      ...conditions,
      times: times
    });
  }

  const handleUpdateConditionValue = (timeIndex, columnName, value) => {
    const conditions = { ...props.conditions }
    props.updateEvolvingConditions({
      ...conditions,
      values: [
        ...conditions.values.map((condition, index) =>
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

export default connect(mapStateToProps, { updateEvolvingConditions })(EvolvingConditionsDetail);
