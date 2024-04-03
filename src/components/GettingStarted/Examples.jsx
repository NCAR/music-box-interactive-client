import React from "react";
import { useDispatch } from "react-redux";
import utils from "../../redux/utils";
import { resetAll, getExample } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const examples = [
  {
    title: "Chapman Cycle",
    description: "Chemistry of the ozone layer.",
    type: utils.examples.CHAPMAN,
  },
  {
    title: "Flow-Tube Wall Loss",
    description:
      "A simple characterization of wall loss of a-Pinene oxidation products in a flow-tube reactor.",
    type: utils.examples.FLOW_TUBE,
  },
  {
    title: "Full Gas-Phase Mechanism",
    description:
      "A variant of the Carbon Bond 5 chemical mechanism used in the MONARCH global/regional chemical weather prediction system.",
    type: utils.examples.FULL_GAS_PHASE,
  },
];

export default function Examples() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (example) => {
    dispatch(resetAll());
    dispatch(getExample(example.type));
    navigate("/mechanism");
  };

  const renderExample = (example, index) => (
    <div className="col" key={index}>
      <div className="card card-body example-panel m-2">
        <div>
          <h3>{example.title}</h3>
        </div>
        <div>{example.description}</div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            handleClick(example);
          }}
        >
          Select
        </button>
      </div>
    </div>
  );

  return <div className="row">{examples.map(renderExample)}</div>;
}
