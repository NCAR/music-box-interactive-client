import React, { useEffect } from "react"
import { connect } from "react-redux"
import { ListGroup } from "react-bootstrap"
import { getMechanism, getReactionDependencies, isSelectedSpecies } from "../../redux/selectors";
import { selectFlowSpecies, deselectFlowSpecies } from "../../redux/actions";

function FlowPanel(props) {

  return (
    <ListGroup className="bg-ncar-menu-secondary p-2" style={{ height: `100%` }}>
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
                elem.isSelected ? props.deselectSpecies(elem.name, props.reactions) : props.selectSpecies(elem.name, props.reactions);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSpecies: (species, dependencies) => dispatch(selectFlowSpecies({ species, dependencies })),
    deselectSpecies: (species, dependencies) => dispatch(deselectFlowSpecies({ species, dependencies })),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowPanel)