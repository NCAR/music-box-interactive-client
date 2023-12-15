import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LinePlot = ({
  data,
  label,
  units,
  labelFontSize,
  tickFontSize,
  toolTipFontSize,
  height,
  precision,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = height * 1.618; // golden ratio determins width based off of the height
    const marginTop = 30;
    const marginRight = 10;
    const marginBottom = 80;
    const marginLeft = width * 0.15;

    // x and y scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.time))
      .range([marginLeft, width - marginRight]);
    const y = d3
      .scaleLinear()
      .domain([0, 1.1 * d3.max(data, (d) => d.value)])
      .range([height - marginBottom, marginTop]);

    // Declare the line generator.
    const lineGenerator = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.value));

    const svg = d3.select(svgRef.current);
    // remove old elements
    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .style("background", "white")
      .style("border-radius", "8px")
      .style("box-shadow", "0px 0px 10px #c6c6c6")
      .style("pointer-events", "all");

    // Add the x-axis.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .style("font-size", `${tickFontSize}px`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0),
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", width / 2)
          .attr("y", 2.5 * tickFontSize)
          .attr("fill", "currentColor")
          .attr("text-anchor", "middle")
          .style("font-size", `${labelFontSize}px`)
          .text(`time (s)`),
      );

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .style("font-size", `${tickFontSize}px`)
      .call(
        d3
          .axisLeft(y)
          .ticks(height / 40) // add grid lines
          .tickFormat((value) => value.toExponential(precision)),
      )
      .call((g) => g.select(".domain").remove()) // remove the y axis spine
      .call((g) =>
        g
          .selectAll(".tick line") // set the tick color
          .attr("stroke-opacity", 0.1),
      )
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone() // copy the ticks and stretch them to make horizontal grid lines
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft + 5)
          .attr("y", labelFontSize)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .style("font-size", `${labelFontSize}px`)
          .text(`${label} (${units})`),
      );

    // Append a path for the line.
    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator(data));

    // Add the transparent vertical line.
    const verticalLine = svg
      .append("line")
      .attr("class", "vertical-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 0.0);

    const tooltipGroup = svg.append("g").style("opacity", 0);

    const tooltipTextTime = tooltipGroup
      .append("text")
      .style("font-size", `${toolTipFontSize}px`)
      .style("dominant-baseline", "hanging");

    const tooltipTextValue = tooltipGroup
      .append("text")
      .style("font-size", `${toolTipFontSize}px`)
      .style("dominant-baseline", "hanging")
      .attr("dy", "1em");

    const dot = svg
      .append("circle")
      .attr("r", 4)
      .style("fill", "steelblue")
      .style("opacity", 0);

    svg
      .on("mouseover", () => {
        verticalLine.style("opacity", 0.3);
        tooltipGroup.style("opacity", 1);
        dot.style("opacity", 1);
      })
      .on("mouseout", () => {
        verticalLine.style("opacity", 0);
        tooltipGroup.style("opacity", 0);
        dot.style("opacity", 0);
      })
      .on("mousemove", (event) => {
        const mouseX = d3.pointer(event)[0];
        const invertedX = x.invert(mouseX);
        const bisect = d3.bisector((d) => d.time).right;
        let index = bisect(data, invertedX);

        if (index >= data.length) {
          index = data.length - 1;
        }

        const activeData = data[index];

        verticalLine
          .attr("x1", x(activeData.time))
          .attr("x2", x(activeData.time))
          .attr("y1", marginTop)
          .attr("y2", height - marginBottom + marginTop);

        tooltipTextTime.text(`${activeData.time} (s)`);
        tooltipTextValue.text(
          `${activeData.value.toExponential(precision)} (${units})`,
        );

        dot.attr("cx", x(activeData.time)).attr("cy", y(activeData.value));

        tooltipGroup.attr(
          "transform",
          `translate(5, ${height - 2 * toolTipFontSize})`,
        );
      });

  }, [data]);
  return (
    <div
      style={{
        padding: `4px`,
      }}
    >
      <svg ref={svgRef} />
    </div>
  );
};

LinePlot.defaultProps = {
  label: "",
  units: "",
  labelFontSize: 16,
  tickFontSize: 14,
  toolTipFontSize: 18,
  height: 400,
  precision: 3,
};

export default LinePlot;
