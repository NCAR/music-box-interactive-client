import React, { useState } from "react";
import { connect } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import TabbedLayout from "../components/TabbedLayout";
import { BasicConfigurationTab, InitialConditionsTab, EvolvingConditionsTab } from "../components/Conditions";

const tabs = [
  { label: "Basic", component: BasicConfigurationTab },
  { label: "Initial", component: InitialConditionsTab },
  { label: "Evolving", component: EvolvingConditionsTab }
];

function Conditions() {
  return (
    <TabbedLayout tabs={tabs}/>
  )
}

export default connect()(Conditions);
