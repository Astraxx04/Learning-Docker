import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = () => {
  // Hardcoded data
  const data = [
    { owner: "Mr. Tris", count: 2 },
    { owner: "Dr. Hris", count: 10 },
    { owner: "Prof. Gris", count: 4 },
    { owner: "Mrs. Pris", count: 5 },
  ];

  // Create a ref for the SVG container
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.owner))
      .range([0, width])
      .padding(0.2); 

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height, 0]);

    // Create bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.owner))
      .attr("y", (d) => yScale(d.count))
      .attr("width", xScale.bandwidth() * 0.6) 
      .attr("height", (d) => height - yScale(d.count))
      .attr("fill", "#FF5733"); 

    // Create x-axis with labels under the bars
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dy", "1em") 

    // Create y-axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 20) 
      .style("text-anchor", "middle")
      .text("Item Incharges");

    // Add y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10) 
      .style("text-anchor", "middle")
      .text("Number of Items");
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
