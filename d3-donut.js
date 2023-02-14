// varoables for donut saved portfolio
let parentDivSavedPortfolio = ".parentDonutSavedPortfolio";
let parentDivSummary = ".parentDonutSummary";
let donutData = "./data.json";
let parentHeight = 450;
let parentWidth = 450;
let margin = 40;
let colors = ["#a25d59", "#8365b3", "#467bc4", "#4390a4", "#3e7c6c", "#a78348"];

// call donutChart saved portfolio
donutChartSavedPortfolio(
  parentDivSavedPortfolio,
  donutData,
  parentHeight,
  parentWidth,
  margin,
  colors
);

// donut chart saved portfolio in d3
function donutChartSavedPortfolio(
  parentDivSavedPortfolio,
  donutData,
  parentHeight,
  parentWidth,
  margin,
  colors
) {
  // Exposed variables
  let attrs = {
    parentDivSavedPortfolio: parentDivSavedPortfolio, //parent div
    height: parentHeight, // donut height
    width: parentWidth, // donut width
    thickness: 60,
    colors, // donut path colors
    margin, // space between donut and parent div
    backgroundColor: "#313540", // donut background color, it's important for stroke
    textFont: "monserrat-SemiBold", // textFont for text in the donut
    textColor: "#a25d59", // textColor for text in the donut
    textProcentDy: ".35em", // text dy parameter for text in the donut
    textProcent: "12.47 %", // text value, which is in the donut
  };

  // calculated properties
  let calc = {};

  calc.outerRadius = (Math.min(parentWidth, parentHeight) - margin) / 2; // outerRadius for donut
  calc.innerRadius =
    (Math.min(parentWidth, parentHeight) - margin) / 2 -
    Math.min(parentWidth, parentHeight) / 7.5; // innderRadius for donut
  calc.fontSize =
    ((Math.min(parentWidth, parentHeight) - margin) / 2 -
      Math.min(parentWidth, parentHeight) / 7.5) /
    2;

  // append the svg object to the div called 'parent'
  let svg = d3
    .select(attrs.parentDivSavedPortfolio)
    .style("text-align", "center")
    .style("background-color", attrs.backgroundColor)
    .style("width", attrs.width + "px")
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
          .innerRadius(calc.innerRadius) // this is the size of the donut hole
          .outerRadius(calc.outerRadius)
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
      .attr("dy", attrs.textProcentDy)
      .attr("text-anchor", "middle")
      .attr("font-family", attrs.textFont)
      .attr("font-size", calc.fontSize)
      .attr("fill", attrs.textColor)
      .text(attrs.textProcent);
  });
}

// call donutChart summary
donutChartSummary(
  parentDivSummary,
  donutData,
  parentHeight,
  parentWidth,
  margin,
  colors
);

// donut chart summary in d3
function donutChartSummary(
  parentDivSummary,
  donutData,
  parentHeight,
  parentWidth,
  margin,
  colors
) {
  // Exposed variables
  let attrs = {
    parentDivSummary: parentDivSummary, //parent div
    height: parentHeight, // donut height
    width: parentWidth, // donut width
    colors, // donut path colors
    margin, // space between donut and parent div
    backgroundColor: "#313540", // donut background color, it's important for stroke
    procentTextFont: "monserrat-SemiBold", // textFont for text in the donut
    procentTextColor: "#1eb885", // textColor for text in the donut
    procentTextDy: ".05em", // text dy parameter for text in the donut
    procentText: "12.47%", // Procent text value, which is in the donut
    textFont: "monserrat-SemiBold", // textFont for text in the donut
    textColor: "#7b808c", // textColor for text in the donut
    textDy: "1.2",
    text: "Portfolio Returns", // text value
  };

  // calculated properties
  let calc = {};

  calc.outerRadius = (d3.min([parentWidth, parentHeight]) - margin) / 2; // outerRadius for donut
  calc.innerRadius =
    (d3.min([parentWidth, parentHeight]) - margin) / 2 -
    d3.min([parentWidth, parentHeight]) / 7.5; // innderRadius for donut
  calc.procentFontSize =
    ((d3.min([parentWidth, parentHeight]) - margin) / 2 -
      d3.min([parentWidth, parentHeight]) / 5) /
    2;
  calc.textFontSize =
    ((d3.min([parentWidth, parentHeight]) - margin) / 2 -
      d3.min([parentWidth, parentHeight]) / 3.5) /
    2;
  calc.cyrcleRadius = calc.innerRadius - 7;
  calc.cyrcleStroke =
    ((d3.min([parentWidth, parentHeight]) - margin) / 2 -
    d3.min([parentWidth, parentHeight]) / 7.5) / 14.5 ;

  console.log(calc.innerRadius);
  console.log(calc.outerRadius);
  console.log(calc.cyrcleRadius);

  // append the svg object to the div called 'parent'
  let svg = d3
    .select(parentDivSummary)
    .style("text-align", "center")
    .style("background-color", attrs.backgroundColor)
    .style("width", attrs.width + "px")
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
          .innerRadius(calc.innerRadius) // this is the size of the donut hole
          .outerRadius(calc.outerRadius)
      )
      .attr("fill", function (d) {
        return color(d.data[1].name);
      })
      .attr("stroke", attrs.backgroundColor)
      .attr("stroke-opacity", 1)
      .style("stroke-width", "3px")
      .style("opacity", 0.7);

    // Procent text inside the donut
    svg
      .append("text")
      .attr("dy", attrs.procentTextDy)
      .attr("text-anchor", "middle")
      .attr("font-family", attrs.procentTextFont)
      .attr("font-size", calc.procentFontSize)
      .attr("fill", attrs.procentTextColor)
      .text(attrs.procentText);

    // text inside the donut
    svg
      .append("text")
      .attr("dy", attrs.textDy)
      .attr("text-anchor", "middle")
      .attr("font-family", attrs.textFont)
      .attr("font-size", calc.textFontSize)
      .attr("fill", attrs.textColor)
      .attr("y", 0)
      .attr("x", 0)
      .text(attrs.text)
      .call(wrap, 50);

    svg
      .append("circle")
      .attr("cx", "0")
      .attr("cy", "0")
      .attr("r", calc.cyrcleRadius)
      .style("fill", "none")
      .style("stroke", "#11674f")
      .style("stroke-width", calc.cyrcleStroke);
  });
}

//text should have text-anchor = "middle"
//wrap text
function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().trim().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      x = text.attr("x"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));

      if (tspan.node().getComputedTextLength() > width && line.length > 1) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}
