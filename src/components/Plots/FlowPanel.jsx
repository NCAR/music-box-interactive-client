import React from "react"
import { connect } from "react-redux"
import { ListGroup } from "react-bootstrap"
import { getMechanism, isSelectedSpecies } from "../../redux/selectors";
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
                elem.isSelected ? props.deselectSpecies(elem.name) : props.selectSpecies(elem.name);
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
      }
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSpecies: (species) => dispatch(selectFlowSpecies(species)),
    deselectSpecies: (species) => dispatch(deselectFlowSpecies(species)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowPanel)