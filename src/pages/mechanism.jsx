import React from "react";
import { connect } from 'react-redux';
import TabbedLayout from "../components/TabbedLayout";
import { MechanismTab } from "../components/Mechanism";

const featureFlags = JSON.parse(import.meta.env.VITE_FEATURE_FLAGS || '{}');

const gas = { label: "Gas Species", component: () => <MechanismTab type="gas" /> };
const aerosols = { label: "Aerosol Species", component: () => <MechanismTab type="aerosol" /> };
const reactions = { label: "Reactions", component: () => <MechanismTab type="reactions" /> };
let tabs = [
  gas,
  reactions
];

if (featureFlags.PART_MC) {
  tabs = [
    gas,
    aerosols,
    reactions
  ];
}

function Mechanism() {
  return (
    <TabbedLayout tabs={tabs} title={"Mechanism"}/>
  )
}

export default connect()(Mechanism);
