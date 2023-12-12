import * as d3 from "d3"
import React, { useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import { getNodes, getLinks } from "../../redux/selectors";

function FlowGraph({nodes, links}) {
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [animatedLinks, setAnimatedLinks] = useState([]);

  const [charge, setCharge] = useState(-300);

  // re-create animation every time nodes change
  useEffect(() => {
    const simulation = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX(400))
      .force("y", d3.forceY(300))
      .force("charge", d3.forceManyBody().strength(charge))
      .force("center", d3.forceCenter(200, 200))
      .force("collision", d3.forceCollide(5))
      .force("link", d3.forceLink()
             .id((d) => { return d.id; })
             .links(links)
            );

    // update state on every frame
    simulation.on("tick", () => {
      setAnimatedNodes([...simulation.nodes()]);
      setAnimatedLinks(links.map((link) => {
        return {
          ...link,
          source: simulation.nodes().filter((node) => {
            return node.id === link.source.id;
          })[0],
          target: simulation.nodes().filter((node) => {
            return node.id === link.target.id;
          })[0],
        }
      }));
    });
    
    // slow down with a small alpha
    simulation.alpha(0.1).restart();

    // stop simulation on unmount
    return () => simulation.stop();
  }, [nodes, links, charge]);

  return (
    <g>
      {animatedNodes.map((node) => (
        <circle
          cx={node.x}
          cy={node.y}
          r={5}
          key={"node_"+node.id}
          stroke="black"
          fill="transparent"
        />
      ))}
      {animatedLinks.map((link, index) => (
        <line
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          key={"link_"+index}
          stroke="black"
        />
      ))}
    </g>
  );
}

const mapStateToProps = (state) => {
  return {
    nodes: getNodes(state),
    links: getLinks(state),
  }
}

export default connect(mapStateToProps)(FlowGraph)


