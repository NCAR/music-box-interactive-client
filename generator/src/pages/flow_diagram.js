import React, { useRef, useState, useCallback } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { getRunStatus, getMechanism } from "../redux/selectors";
import { RunStatus } from "../controllers/models";
import debounce from 'lodash/debounce';
import { fetchFlowDiagram } from "../controllers/api"
import { translate_reactions_to_camp_config } from "../controllers/transformers"
import legend from "../assets/plot_diagram_legend.png"
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';


import { Container, Row, Col, Form, ListGroup } from 'react-bootstrap';
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { set } from "lodash";
// import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

function FlowDiagram(props) {
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState('linear');
  const [physics, setPhysics] = useState(false);
  const [arrowWidth, setArrowWidth] = useState(7);
  const [timeStartRange, setTimeStartRange] = useState("0");
  const [timeEndRange, setTimeEndRange] = useState("0");
  const [concentrationStartRange, setConcentrationStartRange] = useState("0");
  const [concentrationEndRange, setConcentrationEndRange] = useState("1");
  const [showFilteredNodes, setShowFilteredNodes] = useState(false);
  const [blockedElements, setBlockedElements] = useState([]);
  const [selectedElements, setSelectedElements] = useState(props.mechanism.gasSpecies.map(a => a.name));
  const requestInProgress = useRef(false);
  const iframeRef = useRef();

  const [data, setData] = useState({
    includedSpecies: selectedElements,
    blockedSpecies: blockedElements,
    startStep: parseInt(timeStartRange),
    endStep: parseInt(timeEndRange),
    maxArrowWidth: arrowWidth,
    arrowScalingType: scale,
    minMolval: parseFloat(concentrationStartRange),
    maxMolval: parseFloat(concentrationEndRange),
    isPhysicsEnabled: physics,
    reactions: translate_reactions_to_camp_config(props.mechanism),
    showFilteredNodesAndEdges: showFilteredNodes
  });

  
  const handleUserInterfaceOptions = (response) => {
    setTimeStartRange(response.timeRange[0])
    setTimeEndRange(response.timeRange[1])
    setConcentrationStartRange(response.filterRange[0])
    setConcentrationEndRange(response.filterRange[1])
    setData({
      ...data,
      startStep: response.timeRange[0],
      endStep: response.timeRange[1]

    })
  }

  const handleInitialLoad = () => {
    if (loaded === false) {
      setLoaded(true);
      debouncedFetchData();
    }
  }

  const [dropdownSpeciesList, setDropdownSpeciesList] = useState(
    selectedElements.map((element, index) => ([element, true]))
  );



  const displayFlowDiagram = (diagram) => {
    const doc = iframeRef.current.contentDocument;
    // console.log(diagram);
    doc.open();
    doc.write(diagram);
    doc.close();
  };

  const fetchData = async () => {
    try {
      requestInProgress.current = true;
      const combinedResponse = await fetchFlowDiagram(data);
      const response = combinedResponse.data.split('</html>')
      handleUserInterfaceOptions(JSON.parse(response[1]))
      displayFlowDiagram(response[0]);
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

  const handleDataChange = (e) => {
    // preventDefault() overrides form element defaults
    e.preventDefault();
    debouncedFetchData();
  };

  const handleScaleChange = (e) => {
    setScale(e.target.value);
    console.log('scale is: ', e.target.value)
    setData({
      ...data,
      arrowScalingType: e.target.value
    })
  };

  const handlePhysicsChange = (e) => {
    console.log(e.target.checked)
    setPhysics(e.target.checked);
    setData({
      ...data,
      isPhysicsEnabled: e.target.checked
    })
    console.log("e.target.value", e.target.value)
    console.log("e.target.checked", e.target.checked)
    console.log("data.isPhysicsEnabled", data.isPhysicsEnabled)
  };

  const handleArrowWidthChange = (e) => {
    setArrowWidth(e.target.value);
    console.log('arrow width is: ', e.target)
    setData({
      ...data,
      maxArrowWidth: e.target.value
    })
  };

  const handleTimeStartRangeChange = (value) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue) && newValue < timeEndRange && newValue >= 0) {
      setTimeStartRange(value);
      setData({
        ...data,
        startStep: newValue
      })
    }
  };

  const handleTimeEndRangeChange = (value) => {
    const newValue = parseFloat(value);
    setTimeEndRange(value);
    setData({
      ...data,
      endStep: newValue
    })
    console.log("data.endStep", data.endStep)
  };

  const handleConcentrationStartRangeChange = (value) => {
    const newValue = parseFloat(value);
    setConcentrationStartRange(value);
    setData({
      ...data,
      minMolval: newValue
    })
  };

  const handleConcentrationEndRangeChange = (value) => {
    console.log("value", value)
    const newValue = parseFloat(value);
    console.log("newValue", newValue)
    setConcentrationEndRange(value);
    setData({
      ...data,
      maxMolval: newValue
    })
  };

  // const handleSelectionOfSpecies = (e) => {
  //   console.log(e.target);
  // };

  const handleDropDownChange = (value) => {
    setDropdownSpeciesList(
      dropdownSpeciesList.map((element, index) =>
        [element[0], element[0] === value[0] ? !value[1] : element[1]]
      )
    );
    console.log(dropdownSpeciesList); // currently inaccurate due to async?
  };

  const handleShowBlockElementChange = () => {
    setShowFilteredNodes(!showFilteredNodes);

    setData({
      ...data,
      showFilteredNodesAndEdges: !showFilteredNodes
    })
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
    setData({
      ...data,
      blockedSpecies: elements
    })
  };

  // allows you to type "1e5" in that order into the form input controls
  const scientificInputDebounce = (e, setFunction) => {
    /*
      Detects when the "e" or "E" key is pressed. If the key is detected, the event is prevented from propagating further, 
      and the "e" character is inserted into the input field at the current cursor position. The selectionStart and 
      selectionEnd properties are then used to move the cursor to the correct position. Finally, the state is updated with the new value.
      Note that the onBlur event listener is used to convert the input value to a number after the user has finished typing.
    */
    console.log('e.key', e.key)
    e.preventDefault();
    if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
      const currentVal = e.target.value;
      const cursorPos = e.target.selectionStart;
      e.target.value = currentVal.slice(0, cursorPos) + 'e' + currentVal.slice(cursorPos);
      e.target.selectionStart = cursorPos + 1;
      e.target.selectionEnd = cursorPos + 1;
      setFunction(e.target.value);
      console.log("e.target.value", e.target.value)
    }
  }

  return (
    <Layout>
      <main role="main" style={{ padding: `1em` }}>
        <div className="container text-center" onLoad={handleInitialLoad}>
          {props.runStatus === RunStatus.DONE ?
            <Container id="menuContainer" fluid style={{ maxWidth: '3000px' }}>
              <Row>
                <Col xs={4}>
                  <nav>
                    <ListGroup className="bg-ncar-menu-secondary p-2">
                      <Form onSubmit={handleDataChange} id="graphSettingsForm">
                        <ListGroup.Item>.
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
                                value={timeStartRange}
                                onChange={(e) => handleTimeStartRangeChange(e.target.value)}
                                onBlur={(e) => handleTimeStartRangeChange(e.target.value)}
                                onKeyDown={(e) => scientificInputDebounce(e, handleTimeStartRangeChange)}
                              />
                            </Col>
                            <Col xs={2}>to</Col>
                            <Col>
                              <Form.Control
                                type="text"
                                step="any"
                                value={timeEndRange}
                                onChange={(e) => handleTimeEndRangeChange(e.target.value)}
                              // onBlur={(e) => handleTimeEndRangeChange(e.target.value)}
                              // onKeyDown={(e) => scientificInputDebounce(e, handleTimeEndRangeChange)}
                              />
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Form.Label htmlFor="flow-start-range2">Filter range (mol·m<sup>-3</sup>·s<sup>-1</sup>):</Form.Label>
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                step="any"
                                value={concentrationStartRange}
                                onChange={(e) => handleConcentrationStartRangeChange(e.target.value)}
                              // onBlur={(e) => handleConcentrationStartRangeChange(e.target.value)}
                              // onKeyDown={(e) => scientificInputDebounce(e, handleConcentrationStartRangeChange)}
                              />
                            </Col>
                            <Col xs={2}>to</Col>
                            <Col>
                              <Form.Control
                                type="text"
                                step="any"
                                value={concentrationEndRange}
                                onChange={(e) => handleConcentrationEndRangeChange(e.target.value)}
                              // onBlur={(e) => scientificInputDebounce(e, handleConcentrationEndRangeChange)}
                              // onKeyDown={(e) => scientificInputDebounce(e, handleConcentrationEndRangeChange)}
                              />
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Form.Check
                            type="checkbox"
                            label="Show Filtered Nodes"
                            checked={showFilteredNodes}
                            onChange={handleShowBlockElementChange}
                          />
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {/* despite being inside a ListGroup.Item, handleDataChange will not run */}
                          <Dropdown autoClose="inside">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">Reactant Selection</Dropdown.Toggle>
                            <DropdownMenu style={{ overflowY: 'scroll', maxHeight: 400 }}>
                              {dropdownSpeciesList.map((item) => (
                                <ListGroup.Item className="modal-bg" key={"key" + item[0]}
                                  active={item[1]}
                                  name={item[0]}
                                  value={item[0]}
                                  id={item[0]}
                                  onClick={(e) => {
                                    // handleSelectionOfSpecies(e);
                                    handleBlockedElementsChange(item[0]);
                                    handleDropDownChange(item);
                                  }}
                                >
                                  {item[0]}
                                </ListGroup.Item>

                              ))}
                            </DropdownMenu>

                          </Dropdown>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Button variant="primary" type="submit" form="graphSettingsForm">
                            Submit
                          </Button>
                        </ListGroup.Item>

                      </Form>
                    </ListGroup>
                  </nav>
                  <img
                    src={legend}
                    style={{
                      marginLeft: '0px',
                      marginBottom: '10px',
                      width: '200px',
                      position: 'relative',
                      border: '2px solid rgb(189,189,189)',
                    }}
                  />
                </Col>
                <Col>
                  <div id="flow-diagram-container" style={{ height: `100%` }}>
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
    mechanism: getMechanism(state),
  }
}


export default connect(mapStateToProps)(FlowDiagram)


