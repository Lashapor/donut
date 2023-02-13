// varoables for donutchart
let parentDiv = ".parent";
let donutData = "./data.json";
let height = 450;
let width = 450;
let margin = 40;
let colors = ["#a25d59", "#8365b3", "#467bc4", "#4390a4", "#3e7c6c", "#a78348"];

// call donutChart
donutChart(parentDiv, donutData, height, width, margin, colors);

// donut chart in d3
function donutChart(parentDiv, donutData, height, width, margin, colors) {
  let attrs = {
    parentDiv,
    height,
    width,
    colors,
    margin,
    outerRadius: Math.min(width, height) / 2 - margin,
    innerRadius: 130,
    backgroundColor: "#313540",
    fontSize: 60,
    textFont: "monserrat-SemiBold",
    textColor: "#a25d59",
    textDy: ".35em",
    text: "12.47 %",
  };

  // append the svg object to the div called 'parent'
  let svg = d3
    .select(parentDiv)
    .style("text-align", "center")
    .style("background-color", attrs.backgroundColor)
    .append("svg")
    .attr("width", attrs.width)
    .attr("height", attrs.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + attrs.width / 2 + "," + attrs.height / 2 + ")"
    );

  // insert data
  d3.json(donutData).then((data) => {
    // set the color scale
    let color = d3.scaleOrdinal().domain(Object.keys(data)).range(colors);

    // Compute the position of each group on the pie:
    let pie = d3.pie().value(function (d) {
      return d[1].value;
    });
    let data_ready = pie(Object.entries(data));

    // Build the donut chart
    svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(attrs.innerRadius) // This is the size of the donut hole
          .outerRadius(attrs.outerRadius)
      )
      .attr("fill", function (d) {
        return color(d.data[1].name);
      })
      .attr("stroke", attrs.backgroundColor)
      .attr("stroke-opacity", 1)
      .style("stroke-width", "3px")
      .style("opacity", 0.7);

    // text inside donut
    svg
      .append("text")
      .attr("dy", attrs.textDy)
      .attr("text-anchor", "middle")
      .attr("font-family", attrs.textFont)
      .attr("font-size", attrs.fontSize)
      .attr("fill", attrs.textColor)
      .text(attrs.text);
  });
}
