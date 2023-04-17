import React from "react";
import { connect } from "react-redux";

const GasSpecies = ({ species, detailSpecies, setDetailSpecies }) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Clicked on species', species);
    setDetailSpecies({ ...detailSpecies, [species.name]: species });
  }

  return (
    <li className="list-group-item list-group-item-action d-flex justify-content-between detailitem">
      <span>
        <a href="#" onClick={handleClick}>
          {species.name}
        </a>
      </span>
    </li>
  );
};

export default connect()(GasSpecies);
