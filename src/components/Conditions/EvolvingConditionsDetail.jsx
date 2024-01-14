import React, { useState } from "react";
import { connect } from "react-redux";
import { Table, Container, Row, Col, Card, Form } from "react-bootstrap";
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalItems = props.conditions.times.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageRange = 3;
  const leftBound = Math.max(1, currentPage - pageRange);
  const rightBound = Math.min(totalPages, currentPage + pageRange);

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
        <Row>
          <Col>
           <Form.Group controlId="itemsPerPageSelect" className="my-4">
            <Form.Label className="fw-bold">Items Per Page :</Form.Label>
            <Form.Select
              className="mx-2"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              aria-label="Select Items Per Page"
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </Form.Select>
           </Form.Group>
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
              {props.conditions.times
                .slice(startIndex, endIndex)
                .map((time, timeIndex) => (
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
          <div className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages).keys()].map((page) => {
                if (
                  page + 1 === 1 ||
                  page + 1 === totalPages ||
                  (page + 1 >= leftBound && page + 1 <= rightBound)
                ) {
                  return (
                    <li
                      key={page + 1}
                      className={`page-item ${
                        currentPage === page + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </button>
                    </li>
                  );
                } else if (
                  page + 1 === leftBound - 1 ||
                  page + 1 === rightBound + 1
                ) {
                  return (
                    <li key={page + 1} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  );
                }
                return null;
              })}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
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
