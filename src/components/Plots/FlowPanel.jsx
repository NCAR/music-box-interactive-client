import React, { useEffect } from "react"
import { connect } from "react-redux"
import { ListGroup } from "react-bootstrap"
import {
  getMechanism,
  getReactionDependencies,
  isSelectedSpecies,
  getResults,
  getIsFlowPlotLogScale,
} from "../../redux/selectors";
import {
  selectFlowSpecies,
  deselectFlowSpecies,
  setIsFlowPlotLogScale
} from "../../redux/actions";

function FlowPanel(props) {

  return (
    <ListGroup className="bg-ncar-menu-secondary p-2" style={{ height: `100%` }}>
      <ListGroup.Item>
        <label>
          Log Scale
          <input
            type="checkbox"
            checked={props.isLogScale}
            onChange={(e) => {
              props.setIsLogScale(!props.isLogScale, props.reactions, props.results);
            }}
          />
        </label>
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
    </ListGroup>
  )
}

const mapStateToProps = (state) => {
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSpecies: (species, dependencies, results) => dispatch(selectFlowSpecies({ species, dependencies, results })),
    deselectSpecies: (species, dependencies, results) => dispatch(deselectFlowSpecies({ species, dependencies, results })),
    setIsLogScale: (isLogScale, dependencies, results) => dispatch(setIsFlowPlotLogScale({ isLogScale, dependencies, results })),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowPanel)