import React from "react";
import { connect } from 'react-redux';
import TabbedLayout from "../components/TabbedLayout";
import { GasSpeciesTab, ReactionsTab, AerosolSpeciesTab } from "../components/Mechanism";

const tabs = [
  { label: "Gas Species", component: GasSpeciesTab },
  { label: "Aerosol Species", component: AerosolSpeciesTab },
  { label: "Reactions", component: ReactionsTab },
];

function Mechanism() {
  return (
    <TabbedLayout tabs={tabs}/>
  )
}

export default connect()(Mechanism);
