// Define Plot Width
var width = parseInt(d3.select("#scatter").style("width"));

// Define Plot Height
var height = width - width / 3.9;

// Define Plot Margins
var margin = 20;

// Define Area for Axis Labels
var labelArea = 110;

// Define Padding for Left & Bottom Axes
var tPadBot = 40;
var tPadLeft = 40;

// Define SVG Container Variable
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

// Define Variable for Circle Radius
var circRadius;

// Define Function to Define Cirle Radius
function crGet() {
  if (width <= 530) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}

// Call Function to Define Circle Radius
crGet();

// Load CSV Data
d3.csv("https://raw.githubusercontent.com/mjknj18/Demographic-Health-Risk-Analysis/master/assets/data/data.csv").then(function(data) {
  visualize(data);
});

// Define Function for Plot Generation
function visualize(theData) {

  // Define Variables for Chosen X & Y Axes
  var curX = "poverty";
  var curY = "healthcare";

  // Define Blank Variables for Axis Min & Max Values
  var xMin;
  var xMax;
  var yMin;
  var yMax;

  // Define Function to Set X Axis Min & Max
  function xMinMax() {
    xMin = d3.min(theData, function(d) {
    return parseFloat(d[curX]) * 0.90})

    xMax = d3.max(theData, function(d) {
    return parseFloat(d[curX]) * 1.10})}

  // Define Function to Set Y Axis Min & Max
  function yMinMax() {
    yMin = d3.min(theData, function(d) {
    return parseFloat(d[curY]) * 0.90})

    yMax = d3.max(theData, function(d) {
    return parseFloat(d[curY]) * 1.10})}

  // Call Functions to Set Axis Min & Max Values
  xMinMax();
  yMinMax();

  // Define Variable for X Axis Range
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);

  // Define Variable for Y Axis Range
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }

  tickCount();

  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");

  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

    var theCircles = svg.selectAll("g theCircles").data(theData).enter();

    theCircles
        .append("circle")
        .attr("cx", function(d) {return xScale(d[curX])})
        .attr("cy", function(d) {return yScale(d[curY])})
        .attr("r", circRadius)
        .attr("class", function(d) {return "stateCircle " + d.abbr})

    theCircles
        .append("text")
        .attr("x", function(d) {return xScale(d[curX]) - circRadius/2 - 2.5})
        .attr("y",  function(d) {return yScale(d[curY]) + circRadius/2 - 1})
        .text(function(d) {return d.abbr})
        .attr("font-size", "10px")

    svg
        .append("text")
        .attr("x", width / 2)
        .attr("y",  height - labelArea + 15)
        .text("In Poverty (%)")
        .attr("font-size", "15px")

    svg
        .append("text")
        .attr("x", height / 2 * -1)
        .attr("y",  labelArea - 15)
        .text("Lacks Healthcare (%)")
        .attr("font-size", "15px")
        .attr("transform", "translate(0,0) rotate(-90)")
}