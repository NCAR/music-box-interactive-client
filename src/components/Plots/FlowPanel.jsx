import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, ListGroup, Col, Row } from "react-bootstrap";
import {
  getLinks,
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
  getFlowFluxRangeStart,
  getFlowFluxRangeEnd,
  getFlowLocalFluxRangeStart,
  getFlowLocalFluxRangeEnd,
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
  setFlowFluxRangeStart,
  setFlowFluxRangeEnd,
  setFlowLocalFluxRangeStart,
  setFlowLocalFluxRangeEnd,
} from "../../redux/actions";
import MultiRangeSlider from "./MultiRangeSlider";

function FlowPanel(props) {

  const kFluxRangePoints = 10000;

  useEffect(() => {
    props.setTimeRangeStartIndex(0, props.reactions, props.results);
    props.setTimeRangeEndIndex(props.timeSteps.length-1, props.reactions, props.results);
  }, [ props.timeSteps ]);

  useEffect(() => {
    props.setFluxRangeStart(props.fluxMin);
    props.setFluxRangeEnd(props.fluxMax);
  }, [ props.fluxMin, props.fluxMax ]);

  return (
    <nav>
      <ListGroup
        className="bg-ncar-menu-secondary p-2 text-center"
        style={{ height: `100%` }}
      >
        <Form
          onSubmit={(e) => {
            e.disableDefault();
          }}
          id="flow-graph-config-panel"
        >
          <ListGroup.Item>
            <Form.Label htmlFor="flow-scale-select">
              Arrow Width Scaling:
            </Form.Label>
            <Form.Select
              value={props.isLogScale ? "log" : "linear"}
              onChange={(e) => {
                props.setIsLogScale(
                  !props.isLogScale,
                  props.reactions,
                  props.results,
                );
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
                props.setMaxArrowWidth(
                  e.target.value,
                  props.reactions,
                  props.results,
                );
              }}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Label htmlFor="flow-time-range">Time Range [s]</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  step="any"
                  value={props.localTimeRangeStart}
                  onChange={(e) => {
                    props.setLocalTimeRangeStart(e.target.value);
                  }}
                  onBlur={(e) => {
                    const startIndex = props.timeSteps.reduce(
                      (result, val, idx, arr) => {
                        return Math.abs(val - props.localTimeRangeStart) <
                          Math.abs(arr[result] - props.localTimeRangeStart)
                          ? idx
                          : result;
                      },
                    );
                    if (startIndex > props.timeRangeEndIndex) {
                      props.setTimeRangeEndIndex(
                        startIndex,
                        props.reactions,
                        props.results,
                      );
                    }
                    props.setTimeRangeStartIndex(
                      startIndex,
                      props.reactions,
                      props.results,
                    );
                  }}
                />
              </Col>
              <Col xs={2}>to</Col>
              <Col>
                <Form.Control
                  type="text"
                  step="any"
                  value={props.localTimeRangeEnd}
                  onChange={(e) => {
                    props.setLocalTimeRangeEnd(e.target.value);
                  }}
                  onBlur={(e) => {
                    const endIndex = props.timeSteps.reduce(
                      (result, val, idx, arr) => {
                        return Math.abs(val - props.localTimeRangeEnd) <
                          Math.abs(arr[result] - props.localTimeRangeEnd)
                          ? idx
                          : result;
                      },
                    );
                    if (endIndex < props.timeRangeStartIndex) {
                      props.setTimeRangeStartIndex(
                        endIndex,
                        props.reactions,
                        props.results,
                      );
                    }
                    props.setTimeRangeEndIndex(
                      endIndex,
                      props.reactions,
                      props.results,
                    );
                  }}
                />
              </Col>
            </Row>
            <Row>
              <MultiRangeSlider
                min={props.timeSteps[0] ? props.timeSteps[0] : 0}
                max={
                  props.timeSteps[props.timeSteps.length - 1]
                    ? props.timeSteps[props.timeSteps.length - 1]
                    : 0
                }
                minVal={props.localTimeRangeStart}
                maxVal={props.localTimeRangeEnd}
                onChange={({ min, max }) => {
                  const startIndex = props.timeSteps.reduce(
                    (result, val, idx, arr) => {
                      return Math.abs(val - min) < Math.abs(arr[result] - min)
                        ? idx
                        : result;
                    },
                  );
                  const endIndex = props.timeSteps.reduce(
                    (result, val, idx, arr) => {
                      return Math.abs(val - max) < Math.abs(arr[result] - max)
                        ? idx
                        : result;
                    },
                  );
                  if (startIndex != props.timeRangeStartIndex) {
                    props.setTimeRangeStartIndex(
                      startIndex,
                      props.reactions,
                      props.results,
                    );
                  }
                  if (endIndex != props.timeRangeEndIndex) {
                    props.setTimeRangeEndIndex(
                      endIndex,
                      props.reactions,
                      props.results,
                    );
                  }
                }}
              />
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Label htmlFor="flow-flux-range">Flux Range [mol m-3]</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  step="any"
                  value={props.localFluxRangeStart}
                  onChange={(e) => {
                    props.setLocalFluxRangeStart(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (props.fluxRangeStart != props.localFluxRangeStart) {
                      props.setFluxRangeStart(props.localFluxRangeStart);
                    }
                  }}
                />
              </Col>
              <Col xs={2}>to</Col>
              <Col>
                <Form.Control
                  type="text"
                  step="any"
                  value={props.localFluxRangeEnd}
                  onChange={(e) => {
                      props.setLocalFluxRangeEnd(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (props.fluxRangeEnd != props.localFluxRangeEnd) {
                      props.setFluxRangeEnd(props.localFluxRangeEnd);
                    }
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
                    elem.isSelected
                      ? props.deselectSpecies(
                          elem.name,
                          props.reactions,
                          props.results,
                        )
                      : props.selectSpecies(
                          elem.name,
                          props.reactions,
                          props.results,
                        );
                  }}
                >
                  <span className="species-select-list-item">{elem.name}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </Form>
      </ListGroup>
    </nav>
  );
}

const mapStateToProps = (state) => {
  const timeSteps = getResultTimes(state);
  const localStart = getFlowLocalTimeRangeStart(state);
  const localEnd = getFlowLocalTimeRangeEnd(state);
  const startTimeIndex = getFlowTimeRangeStartIndex(state);
  const endTimeIndex = getFlowTimeRangeEndIndex(state);
  const startTime = timeSteps[startTimeIndex];
  const endTime = timeSteps[endTimeIndex];
  const links = getLinks(state);
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
    fluxMin: Math.min(...links.map((link) => link.flux)),
    fluxMax: Math.max(...links.map((link) => link.flux)),
    fluxRangeStart: getFlowFluxRangeStart(state),
    fluxRangeEnd: getFlowFluxRangeEnd(state),
    localFluxRangeStart: getFlowLocalFluxRangeStart(state),
    localFluxRangeEnd: getFlowLocalFluxRangeEnd(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSpecies: (species, dependencies, results) =>
      dispatch(selectFlowSpecies({ species, dependencies, results })),
    deselectSpecies: (species, dependencies, results) =>
      dispatch(deselectFlowSpecies({ species, dependencies, results })),
    setIsLogScale: (isLogScale, dependencies, results) =>
      dispatch(setIsFlowPlotLogScale({ isLogScale, dependencies, results })),
    setMaxArrowWidth: (maxArrowWidth, dependencies, results) =>
      dispatch(setFlowMaxArrowWidth({ maxArrowWidth, dependencies, results })),
    setTimeRangeStartIndex: (timeIndex, dependencies, results) =>
      dispatch(
        setFlowTimeRangeStartIndex({ timeIndex, dependencies, results }),
      ),
    setTimeRangeEndIndex: (timeIndex, dependencies, results) =>
      dispatch(setFlowTimeRangeEndIndex({ timeIndex, dependencies, results })),
    setLocalTimeRangeStart: (time) =>
      dispatch(setFlowLocalTimeRangeStart({ time })),
    setLocalTimeRangeEnd: (time) =>
      dispatch(setFlowLocalTimeRangeEnd({ time })),
    setFluxRangeStart: (flux) => dispatch(setFlowFluxRangeStart({ flux })),
    setFluxRangeEnd: (flux) => dispatch(setFlowFluxRangeEnd({ flux })),
    setLocalFluxRangeStart: (flux) => dispatch(setFlowLocalFluxRangeStart({ flux })),
    setLocalFluxRangeEnd: (flux) => dispatch(setFlowLocalFluxRangeEnd({ flux })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowPanel);
