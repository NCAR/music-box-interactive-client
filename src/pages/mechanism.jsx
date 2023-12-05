import React from "react";
import { connect } from 'react-redux';
import TabbedLayout from "../components/TabbedLayout";
import { MechanismTab } from "../components/Mechanism";

const tabs = [
  { label: "Gas Species", component: () => <MechanismTab type="gas" /> },
  { label: "Aerosol Species", component: () => <MechanismTab type="aerosol" /> },
  { label: "Reactions", component: () => <MechanismTab type="reactions" /> },
];

function Mechanism() {
  return (
    <TabbedLayout tabs={tabs} title={"Mechanism"}/>
  )
}

export default connect()(Mechanism);
