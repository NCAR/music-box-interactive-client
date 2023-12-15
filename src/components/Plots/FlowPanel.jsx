import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Form, ListGroup, Col, Row } from "react-bootstrap"
import {
  getMechanism,
  getReactionDependencies,
  isSelectedSpecies,
  getResults,
  getIsFlowPlotLogScale,
  getFlowMaxArrowWidth,
  getFlowTimeRangeStartIndex,
  getFlowTimeRangeEndIndex,
  getResultTimes,
  getFlowLocalTimeRangeStart,
  getFlowLocalTimeRangeEnd,
} from "../../redux/selectors";
import {
  selectFlowSpecies,
  deselectFlowSpecies,
  setIsFlowPlotLogScale,
  setFlowMaxArrowWidth,
  setFlowTimeRangeStartIndex,
  setFlowTimeRangeEndIndex,
  setFlowLocalTimeRangeStart,
  setFlowLocalTimeRangeEnd,
} from "../../redux/actions";

function FlowPanel(props) {

  return (
    <nav>
      <ListGroup className="bg-ncar-menu-secondary p-2 text-center" style={{ height: `100%` }}>
        <Form onSubmit={(e) => { e.disableDefault(); }} id="flow-graph-config-panel">
          <ListGroup.Item>
            <Form.Label htmlFor="flow-scale-select">
              Arrow Width Scaling:
            </Form.Label>
            <Form.Select
              value={props.isLogScale ? "log" : "linear"}
              onChange={(e) => {
                props.setIsLogScale(!props.isLogScale, props.reactions, props.results);
              }}
            >
              <option value="log">Log</option>
              <option value="linear">Linear</option>
            </Form.Select>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Label htmlFor="flow-arrow-width-range">
              Max Arrow Width: {props.maxArrowWidth}
            </Form.Label>
            <Form.Range
              min="1"
              max="15"
              value={props.maxArrowWidth}
              onChange={(e) => {
                props.setMaxArrowWidth(e.target.value, props.reactions, props.results);
              }}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Label htmlFor="flow-time-range">
              Time Range (s):
            </Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  step="any"
                  value={props.localTimeRangeStart}
                  onChange={(e) => { props.setLocalTimeRangeStart(e.target.value) }}
                  onBlur={(e) => {
                    const startIndex = props.timeSteps.reduce((result, val, idx, arr) => {
                      return (Math.abs(val - props.localTimeRangeStart) < Math.abs(arr[result] - props.localTimeRangeStart) ? idx : result);
                    });
                    if (startIndex > props.timeRangeEndIndex) {
                      props.setTimeRangeEndIndex(startIndex, props.reactions, props.results);
                    }
                    props.setTimeRangeStartIndex(startIndex, props.reactions, props.results);
                  }}
                />
              </Col>
              <Col xs={2}>to</Col>
              <Col>
                <Form.Control
                  type="text"
                  step="any"
                  value={props.localTimeRangeEnd}
                  onChange={(e) => { props.setLocalTimeRangeEnd(e.target.value) }}
                  onBlur={(e) => {
                    const endIndex = props.timeSteps.reduce((result, val, idx, arr) => {
                      return (Math.abs(val - props.localTimeRangeEnd) < Math.abs(arr[result] - props.localTimeRangeEnd) ? idx : result);
                    });
                    if (endIndex < props.timeRangeStartIndex) {
                      props.setTimeRangeStartIndex(endIndex, props.reactions, props.results);
                    }
                    props.setTimeRangeEndIndex(endIndex, props.reactions, props.results);
                  }}
                />
              </Col>
            </Row>
            <Row>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            Select species:
            <ListGroup className="species-list" key="species-select-list-group">
              {props.species?.map((elem, index) => (
                <ListGroup.Item
                  className="modal-bg"
                  key={index}
                  active={elem.isSelected}
                  name={elem.name}
                  value={elem.name}
                  id={elem.name}
                  onClick={(e) => {
                    elem.isSelected ? props.deselectSpecies(elem.name, props.reactions, props.results) : props.selectSpecies(elem.name, props.reactions, props.results);
                  }}
                >
                  <span className="species-select-list-item">
                    {elem.name}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </Form>
      </ListGroup>
    </nav>
  )
}

const mapStateToProps = (state) => {
  const timeSteps = getResultTimes(state);
  const localStart = getFlowLocalTimeRangeStart(state);
  const localEnd = getFlowLocalTimeRangeEnd(state);
  const startTimeIndex = getFlowTimeRangeStartIndex(state);
  const endTimeIndex = getFlowTimeRangeEndIndex(state);
  const startTime = timeSteps[startTimeIndex];
  const endTime = timeSteps[endTimeIndex];
  return {
    species: getMechanism(state).gasSpecies.map((species) => {
      return {
        ...species,
        isSelected: isSelectedSpecies(state, species.name),
      };
    }),
    reactions: getReactionDependencies(state),
    results: getResults(state),
    isLogScale: getIsFlowPlotLogScale(state),
    maxArrowWidth: getFlowMaxArrowWidth(state),
    timeSteps: timeSteps,
    timeRangeStartIndex: startTimeIndex,
    timeRangeEndIndex: endTimeIndex,
    localTimeRangeStart: localStart ? localStart : startTime ? startTime : 0,
    localTimeRangeEnd: localEnd ? localEnd : endTime ? endTime : 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSpecies: (species, dependencies, results) => dispatch(selectFlowSpecies({ species, dependencies, results })),
    deselectSpecies: (species, dependencies, results) => dispatch(deselectFlowSpecies({ species, dependencies, results })),
    setIsLogScale: (isLogScale, dependencies, results) => dispatch(setIsFlowPlotLogScale({ isLogScale, dependencies, results })),
    setMaxArrowWidth: (maxArrowWidth, dependencies, results) => dispatch(setFlowMaxArrowWidth({ maxArrowWidth, dependencies, results })),
    setTimeRangeStartIndex: (timeIndex, dependencies, results) => dispatch(setFlowTimeRangeStartIndex({ timeIndex, dependencies, results })),
    setTimeRangeEndIndex: (timeIndex, dependencies, results) => dispatch(setFlowTimeRangeEndIndex({ timeIndex, dependencies, results })),
    setLocalTimeRangeStart: (time) => dispatch(setFlowLocalTimeRangeStart({ time })),
    setLocalTimeRangeEnd: (time) => dispatch(setFlowLocalTimeRangeEnd({ time })),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowPanel)