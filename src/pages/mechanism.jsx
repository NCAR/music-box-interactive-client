import React from "react";
import { connect } from "react-redux";
import TabbedLayout from "../components/TabbedLayout";
import { MechanismTab } from "../components/Mechanism";

// default to false
const { PART_MC = false } = JSON.parse(
  import.meta.env.VITE_FEATURE_FLAGS || "{}",
);

const tabDefinitions = {
  gas: { label: "Gas Species", component: () => <MechanismTab type="gas" /> },
  aerosol: {
    label: "Aerosol Species",
    component: () => <MechanismTab type="aerosol" />,
  },
  reactions: {
    label: "Reactions",
    component: () => <MechanismTab type="reactions" />,
  },
};

const tabs = PART_MC
  ? [tabDefinitions.gas, tabDefinitions.aerosol, tabDefinitions.reactions]
  : [tabDefinitions.gas, tabDefinitions.reactions];

function Mechanism() {
  return <TabbedLayout tabs={tabs} title={"Mechanism"} />;
}

export default connect()(Mechanism);
