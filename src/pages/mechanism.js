import React, { useState } from "react";
import { connect } from 'react-redux';
import Layout from "../components/Layout";
import { GasSpeciesTab, ReactionsTab, AerosolSpeciesTab } from "../components/Mechanism";

function Mechanism(props) {
  const [activeTab, setActiveTab] = useState(0);

  const paramClass = (value) => (activeTab === value ? "btn btn-primary btn-ncar-active" : "btn btn-secondary");

  const tabs = [
    { value: 0, label: "Gas Species", component: <GasSpeciesTab key={0} /> },
    { value: 1, label: "Aerosol Species", component: <AerosolSpeciesTab key={1} /> },
    { value: 2, label: "Reactions", component: <ReactionsTab  key={2}/> },
  ];

  return (
    <Layout>
      <main role="main">
        <div className="container text-center">
          <div className="navbox pt-2">
            {tabs.map(tab => (
              <button
                key={tab.value}
                className={paramClass(tab.value)}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {tabs.map(tab => activeTab === tab.value && tab.component)}
      </main>
    </Layout>
  );
}

export default connect()(Mechanism);
