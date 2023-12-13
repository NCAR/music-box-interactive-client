import * as d3 from "d3"
import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { getNodes, getLinks } from "../../redux/selectors";
import * as styles from "../../styles/flow_graph.module.css"

function FlowGraph({ nodes, links }) {
  const ref = useRef();

  const [charge, setCharge] = useState(-300);

  // re-create animation every time nodes change
  useEffect(() => {
    const svg = d3.select(ref.current)

    const width = svg.attr("width")
    const height = svg.attr("height")

    const g = svg.join("g")

    // force simulation
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

    const link = g.selectAll("line")
      .data(links)
      .join("line")
      .attr("class", (d) => { return styles[d.className]; })
      .attr("marker-end", "url(#arrow)");

    const node = g.selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("class", (d) => { return styles[d.className]; })

    node.append("title")
      .text((d) => { return d.name; })

    svg.call(d3.zoom()
      .extent([0, 0], [width, height])
      .scaleExtent([1, 8])
      .on("zoom", ({transform}) => {
        g.attr("transform", `scale(${transform.k})`);
      }));

    // update state on every frame
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => { return d.source.x; })
        .attr("y1", (d) => { return d.source.y; })
        .attr("x2", (d) => { return d.target.x; })
        .attr("y2", (d) => { return d.target.y; });
      node
        .attr("cx", (d) => { return d.x; })
        .attr("cy", (d) => { return d.y; });
    });

    // slow down with a small alpha
    simulation.alpha(0.1).restart();

    // stop simulation on unmount
    return () => simulation.stop();
  }, [nodes, links, charge]);

  return <svg width="100%" height="100%" id="flow-diagram" ref={ref} />
}

const mapStateToProps = (state) => {
  return {
    nodes: getNodes(state),
    links: getLinks(state),
  }
}

export default connect(mapStateToProps)(FlowGraph)


