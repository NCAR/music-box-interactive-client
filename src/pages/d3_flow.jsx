import * as d3 from "d3";
import { connect } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import {
  getRunStatus,
  getMechanism,
  getSpeciesPlots,
  getReactionPlots,
  getEnvironmentPlots,
} from "../redux/selectors";

function ForceGraph({ nodes, charge }) {
  const [animatedNodes, setAnimatedNodes] = useState([]);

  // re-create animation every time nodes change
  useEffect(() => {
    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(400))
      .force("y", d3.forceY(300))
      .force("charge", d3.forceManyBody().strength(charge))
      .force("collision", d3.forceCollide(5));

    // update state on every frame
    simulation.on("tick", () => {
      setAnimatedNodes([...simulation.nodes()]);
    });

    // copy nodes into simulation
    simulation.nodes([...nodes]);
    // slow down with a small alpha
    simulation.alpha(0.1).restart();

    // stop simulation on unmount
    return () => simulation.stop();
  }, [nodes, charge]);

  return (
    <g>
      {animatedNodes.map((node) => (
        <circle
          cx={node.x}
          cy={node.y}
          r={node.r}
          key={node.id}
          stroke="black"
          fill="transparent"
        />
      ))}
    </g>
  );
}

const mapStateToProps = (state) => {
  return {
    runStatus: getRunStatus(state),
    mechanism: getMechanism(state),
    plots: getPlots(state),
    speciesPlots: getSpeciesPlots(state),
    reactionPlots: getReactionPlots(state),
    environmentPlots: getEnvironmentPlots(state),
  };
};

function NetworkGraph() {
  const [charge, setCharge] = useState(-3);

  // create nodes with unique ids
  // radius: 5px
  const nodes = useMemo(
    () =>
      d3.range(50).map((n) => {
        return { id: n, r: 5 };
      }),
    [],
  );

  return (
    <Layout>
      <main role="main" style={{ padding: `1em` }}>
        <div className="NetworkGraph">
          <h1>React & D3 force graph</h1>
          <p>Current charge: {charge}</p>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          />
          <svg width="800" height="600">
            <ForceGraph nodes={nodes} charge={charge} />
          </svg>
        </div>
      </main>
    </Layout>
  );
}

export default connect(mapStateToProps)(NetworkGraph);
