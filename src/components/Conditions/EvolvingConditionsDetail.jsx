import React, {useState} from "react";
import { connect } from "react-redux";
import { Table, Container, Row, Col, Card } from "react-bootstrap";
import { getEvolvingConditions } from "../../redux/selectors";
import {
  resortEvolvingConditions,
  updateEvolvingTime,
  updateEvolvingConditionValue,
} from "../../redux/actions";
import AddEvolvingCondition from "./AddEvolvingCondition";
import AddEvolvingTime from "./AddEvolvingTime";
import RemoveEvolvingTime from "./RemoveEvolvingTime";
import RemoveEvolvingCondition from "./RemoveEvolvingCondition";
import DownloadEvolvingConditions from "./DownloadEvolvingConditions";
import UploadEvolvingConditions from "./UploadEvolvingConditions";

const EvolvingConditionsDetail = (props) => {
  const handleRefresh = () => {
    props.resortEvolvingConditions();
  };

  const handleUpdateTime = (timeIndex, value) => {
    props.updateEvolvingTime({
      timeIndex: timeIndex,
      value: value,
    });
  };

  const handleUpdateConditionValue = (timeIndex, conditionName, value) => {
    props.updateEvolvingConditionValue({
      timeIndex: timeIndex,
      conditionName: conditionName,
      value: value,
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <Container>
        <Row>
          <Col xs={5}>
            <DownloadEvolvingConditions />
          </Col>
          <Col xs={7}>
            <UploadEvolvingConditions />
          </Col>
        </Row>
      </Container>
      <Card className="mb-4 conditions-card shadow-sm">
        <Card.Header className="d-flex justify-content-between">
          <h4 className="my-0 fw-normal">Evolving Conditions</h4>
          <AddEvolvingCondition />
        </Card.Header>
        <Card.Body className="body-card">
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>time</th>
                {props.conditions.values.map(({ name }, index) => (
                  <th className="fw-bold" key={`column-${index}`}>
                    <div className="d-flex justify-content-between">
                      <div className="text-nowrap">{name}</div>
                      <RemoveEvolvingCondition conditionIndex={index} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.conditions.times.slice(startIndex, endIndex).map((time, timeIndex) => (
                <tr key={`condition-time-${timeIndex}`}>
                  <td>
                    <div onBlur={handleRefresh}>
                      <input
                        type="text"
                        className="form-control"
                        value={time}
                        onChange={(e) =>
                          handleUpdateTime(timeIndex, e.target.value)
                        }
                      ></input>
                    </div>
                  </td>
                  {props.conditions.values.map(({ name, values }, index) => (
                    <td key={`condition-${timeIndex}-${index}`}>
                      <div onBlur={handleRefresh}>
                        <input
                          type="text"
                          className="form-control"
                          value={values[startIndex + timeIndex]}
                          onChange={(e) =>
                            handleUpdateConditionValue(
                              startIndex + timeIndex,
                              name,
                              e.target.value,
                            )
                          }
                        ></input>
                      </div>
                    </td>
                  ))}
                  <td>
                    <RemoveEvolvingTime timeIndex={timeIndex} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="m-2">
            <AddEvolvingTime />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return { conditions: getEvolvingConditions(state) };
};

const dispatchers = {
  resortEvolvingConditions,
  updateEvolvingTime,
  updateEvolvingConditionValue,
};

export default connect(mapStateToProps, dispatchers)(EvolvingConditionsDetail);
