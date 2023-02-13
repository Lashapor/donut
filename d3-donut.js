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

  // Exposed variables
  let attrs = {
    parentDiv,                                            //parent div
    height,                                               // donut height
    width,                                                // donut width
    colors,                                               // donut path colors
    margin,                                               // space between donut and parent div
    outerRadius: Math.min(width, height) / 2 - margin,    // outerRadius for donut
    innerRadius: 130,                                     // innderRadius for donut
    backgroundColor: "#313540",                           // donut background color, it's important for stroke
    fontSize: 60,                                         // textSize for text in the donut
    textFont: "monserrat-SemiBold",                       // textFont for text in the donut
    textColor: "#a25d59",                                 // textColor for text in the donut
    textDy: ".35em",                                      // text dy parameter for text in the donut
    text: "12.47 %",                                      // text value, which is in the donut
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

    // compute the position of each group on the pie:
    let pie = d3.pie().value(function (d) {
      return d[1].value;
    });
    let data_ready = pie(Object.entries(data));

    // build the donut chart
    svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(attrs.innerRadius) // this is the size of the donut hole
          .outerRadius(attrs.outerRadius)
      )
      .attr("fill", function (d) {
        return color(d.data[1].name);
      })
      .attr("stroke", attrs.backgroundColor)
      .attr("stroke-opacity", 1)
      .style("stroke-width", "3px")
      .style("opacity", 0.7);

    // text inside the donut
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
