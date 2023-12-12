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
    
    const link = svg.append("g")
                  .attr("class", "links")
                  .selectAll("line")
                  .data(links)
                  .enter().append("line")
                    .attr("class", (d) => { 
                      console.log("class name" + d);
                      return styles[d.className]; })
                    .attr("marker-end", "url(#arrow)");

    const node = svg.append("g")
                  .attr("class", "nodes")
                  .selectAll("circle")
                  .data(nodes)
                  .enter().append("circle")
                    .attr("class", (d) => { return styles[d.className]; })
    
    node.append("title")
        .text((d) => { return d.name; })

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

  return <svg width="100%" height="100%" id="flow-diagram" ref={ref}/>
}

const mapStateToProps = (state) => {
  return {
    nodes: getNodes(state),
    links: getLinks(state),
  }
}

export default connect(mapStateToProps)(FlowGraph)


