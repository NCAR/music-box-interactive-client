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
}) => {
  const svgRef = useRef();

  useEffect(() => {
    // Declare the chart dimensions and margins.
    const width = height * 1.618;
    const marginTop = 20;
    const marginRight = 10;
    const marginBottom = 80;
    const marginLeft = 60;

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

    // Create the SVG container using react-d3-library.
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .style("background", "white")
      .style("border-radius", "8px")
      .style("box-shadow", "0px 0px 10px #c6c6c6");
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
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", marginLeft)
          .attr("y", labelFontSize)
          .attr("fill", "currentColor")
          .attr("text-anchor", "middle")
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

    const tooltipGroup = svg.append("g").style("opacity", 1);

    const tooltipText = tooltipGroup
      .append("text")
      .style("font-size", `${toolTipFontSize}px`)
      .style("dominant-baseline", "hanging");

    // Create a transparent overlay covering the entire chart area
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => {
        verticalLine.style("opacity", 0.3);
        tooltipGroup.style("opacity", 1);
      })
      .on("mouseout", () => {
        verticalLine.style("opacity", 0);
        tooltipGroup.style("opacity", 0);
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
          .attr("y1", 2 * marginTop)
          .attr("y2", height - marginBottom + marginTop);

        tooltipText.text(
          `Time: ${activeData.time} (s) Temperature: ${Math.round(
            activeData.value,
            3,
          )}`,
        );

        const textBBox = tooltipText.node().getBBox();

        const bg_width = textBBox.width;
        const bg_height = textBBox.height;
        tooltipGroup.attr(
          "transform",
          `translate(${width - bg_width - 3}, ${height - bg_height - 3})`,
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
};

export default LinePlot;
