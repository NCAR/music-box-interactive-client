import * as d3 from "d3"
import React, { useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"

function FlowGraph(props) {
  const [animatedNodes, setAnimatedNodes] = useState([]);

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
  return {}
}

export default connect(mapStateToProps)(FlowGraph)


