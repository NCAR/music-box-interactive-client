import React, { useRef, useState, useCallback } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { getRunStatus, getMechanism } from "../redux/selectors";
import { RunStatus } from "../controllers/models";
import debounce from 'lodash/debounce';
import { fetchFlowDiagram } from "../controllers/api"
import { translate_reactions_to_camp_config } from "../controllers/transformers"
import legend from "../assets/plot_diagram_legend.png"

import { Container, Row, Col, Form, ListGroup } from 'react-bootstrap';
// import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

function FlowDiagram(props) {
  console.log(props.mechanism)
  console.log(props.mechanism.gasSpecies.map(a => a.name))
  const [scale, setScale] = useState('log');
  const [physics, setPhysics] = useState(false);
  const [arrowWidth, setArrowWidth] = useState(7);
  const [startRange, setStartRange] = useState(0);
  const [endRange, setEndRange] = useState(1);
  const [startFilterRange, setStartFilterRange] = useState(0);
  const [endFilterRange, setEndFilterRange] = useState(1);
  const [showBlockedElements, setShowBlockedElements] = useState(false);
  const [blockedElements, setBlockedElements] = useState([]);
  const [selectedElements, setSelectedElements] = useState(props.mechanism.gasSpecies.map(a => a.name));
  const [diagramHtml, setDiagramHtml] = useState('');
  const requestInProgress = useRef(false);
  const iframeRef = useRef();

  const [data, setData] = useState({
    includedSpecies: selectedElements,
    blockedSpecies: blockedElements,
    startStep: startRange,
    endStep: endRange,
    maxArrowWidth: arrowWidth,
    arrowScalingType: scale,
    minMolval: startFilterRange,
    maxMolval: endFilterRange,
    currentMinValOfGraph: startRange,
    currentMaxValOfGraph: endRange,
    isPhysicsEnabled: physics,
    reactions: translate_reactions_to_camp_config(props.mechanism)
  });

  const displayFlowDiagram = (diagram) => {
    const doc = iframeRef.current.contentDocument;
    doc.open();
    doc.write(diagram);
    doc.close();
  };

  const fetchData = async () => {
    try {
      requestInProgress.current = true;
      const response = await fetchFlowDiagram(data);
      displayFlowDiagram(response.data);
    } catch (error) {
      // handle error
    } finally {
      requestInProgress.current = false;
    }
  };

  const debouncedFetchData = useCallback(
    debounce(() => {
      if (!requestInProgress.current) {
        fetchData();
      }
    }, 1000),
    [data]
  );

  const handleDataChange = () => {
    debouncedFetchData();
  };

  const handleScaleChange = (e) => {
    setScale(e.target.value);
    setData({
      ...data,
      arrowScalingType: e.target.value
    })
  };

  const handlePhysicsChange = (e) => {
    setPhysics(e.target.checked);
    setData({
      ...data,
      physics: e.target.value
    })
  };

  const handleArrowWidthChange = (e) => {
    setArrowWidth(e.target.value);
    setData({
      ...data,
      maxArrowWidth: e.target.value
    })
  };

  const handleStartRangeChange = (value) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue) && newValue < endRange && newValue >= 0) {
      setStartRange(newValue);
      setData({
        ...data,
        startStep: newValue
      })
    }
  };

  const handleEndRangeChange = (value) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue) && newValue > startRange) {
      setEndRange(newValue);
      setData({
        ...data,
        endStep: newValue
      })
    }
  };

  const handleStartFilterRangeChange = (value) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue) && newValue < endFilterRange && newValue >= 0) {
      setStartFilterRange(newValue);
      setData({
        ...data,
        minMolval: newValue
      })
    }
  };

  const handleEndFilterRangeChange = (value) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue) && newValue > startFilterRange) {
      setEndFilterRange(newValue);
      setData({
        ...data,
        maxMolval: newValue
      })
    }
  };

  const handleShowBlockElementChange = () => {
    setShowBlockedElements(!showBlockedElements);
  };

  const handleBlockedElementsChange = (name) => {
    const elements = [...blockedElements];
    const index = elements.indexOf(name);

    if (index === -1) {
      elements.push(name);
    } else {
      elements.splice(index, 1);
    }

    setBlockedElements(elements);
  };

  const handleSelectAllBlocked = () => {
    if (selectedElements.length === blockedElements.length) {
      setSelectedElements([]);
    } else {
      setSelectedElements(blockedElements);
    }
  };

  // allows you to type "1e5" in that order into the form input controls
  const scientificInputDebounce = (e, setFunction) => {
    /*
      Detects when the "e" or "E" key is pressed. If the key is detected, the event is prevented from propagating further, 
      and the "e" character is inserted into the input field at the current cursor position. The selectionStart and 
      selectionEnd properties are then used to move the cursor to the correct position. Finally, the state is updated with the new value.
      Note that the onBlur event listener is used to convert the input value to a number after the user has finished typing.
    */
    if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
      const currentVal = e.target.value;
      const cursorPos = e.target.selectionStart;
      e.target.value = currentVal.slice(0, cursorPos) + 'e' + currentVal.slice(cursorPos);
      e.target.selectionStart = cursorPos + 1;
      e.target.selectionEnd = cursorPos + 1;
      setFunction(e.target.value);
    }
  }

  return (
    <Layout>
      <main role="main" style={{ padding: `1em` }}>
        <div className="container text-center">
          {props.runStatus === RunStatus.DONE ?
            <Container fluid style={{ maxWidth: '3000px' }}>
              <Row>
                <Col xs={4}>
                  <nav>
                    <ListGroup className="bg-ncar-menu-secondary p-2">
                      <Form onChange={handleDataChange}>
                        <ListGroup.Item>
                          <Form.Label htmlFor="flow-scale-select">Arrow width scaling:</Form.Label>
                          <Form.Select value={scale} onChange={handleScaleChange}>
                            <option value="log">Log</option>
                            <option value="linear">Linear</option>
                          </Form.Select>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Form.Check
                            type="checkbox"
                            label="Optimize Performance"
                            checked={physics}
                            onChange={handlePhysicsChange}
                          />
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Form.Label htmlFor="flow-arrow-width-range">
                            Max arrow width: {arrowWidth}
                          </Form.Label>
                          <Form.Range min="1" max="15" value={arrowWidth} onChange={handleArrowWidthChange} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Form.Label htmlFor="flow-start-range">Time Range (seconds):</Form.Label>
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                step="any"
                                value={startRange}
                                onChange={(e) => handleStartRangeChange(e.target.value)}
                                onBlur={(e) => handleStartRangeChange(e.target.value)}
                                onKeyDown={(e) => scientificInputDebounce(e, handleStartRangeChange)}
                              />
                            </Col>
                            <Col xs={2}>to</Col>
                            <Col>
                              <Form.Control
                                type="text"
                                step="any"
                                value={endRange}
                                onChange={(e) => handleEndRangeChange(e.target.value)}
                                onBlur={(e) => handleEndRangeChange(e.target.value)}
                                onKeyDown={(e) => scientificInputDebounce(e, handleEndRangeChange)}
                              />
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Form.Label htmlFor="flow-start-range2">Filter range (mol m<sup>-3</sup>):</Form.Label>
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                step="any"
                                value={startFilterRange}
                                onChange={(e) => handleStartFilterRangeChange(e.target.value)}
                                onBlur={(e) => handleStartFilterRangeChange(e.target.value)}
                                onKeyDown={(e) => scientificInputDebounce(e, handleStartFilterRangeChange)}
                              />
                            </Col>
                            <Col xs={2}>to</Col>
                            <Col>
                              <Form.Control
                                type="text"
                                step="any"
                                value={endFilterRange}
                                onChange={(e) => handleEndFilterRangeChange(e.target.value)}
                                onBlur={(e) => handleEndFilterRangeChange(e.target.value)}
                                onKeyDown={(e) => scientificInputDebounce(e, handleEndFilterRangeChange)}
                              />
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </Form>
                      <ListGroup horizontal className="bg-white" style={{ height: '60px', fontSize: '1vm' }}>
                        <ListGroup.Item
                          className="menu-it selected-menu-it"
                          style={{ float: 'left' }}
                        >
                          Add Species
                        </ListGroup.Item>
                        <ListGroup.Item className="menu-it">
                          Block Species
                        </ListGroup.Item>
                      </ListGroup>
                    </ListGroup>
                  </nav>
                </Col>
                <Col>
                  <div id="flow-diagram-container">
                    <img
                      src={legend}
                      style={{
                        marginLeft: '40px',
                        marginTop: '40px',
                        width: '200px',
                        position: 'absolute',
                        border: '2px solid rgb(189,189,189)',
                      }}
                    />
                    <iframe
                      ref={iframeRef}
                      style={{ width: '100%', height: '100%' }}
                      title="Network plot"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
            :
            <p> The flow diagram will be available once a model run has been completed </p>
          }
        </div>
      </main>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    runStatus: getRunStatus(state),
    mechanism: getMechanism(state)
  }
}

export default connect(mapStateToProps)(FlowDiagram)

