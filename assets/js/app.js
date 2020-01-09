// Define Plot Margins & Dimensions
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/mjknj18/Demographic-Health-Risk-Analysis/master/assets/data/data.csv").then(function(data) {
    
    console.log(data)

    var poverty_data = []
    var healthcare_data = []

    data.forEach(function(item) {
        poverty_data.push(item.poverty)
        healthcare_data.push(item.healthcare)})

    console.log(poverty_data)
    console.log(healthcare_data)

    // Add X axis
//     var x = d3.scaleLinear().domain([d3.min(data.poverty), d3.max(data.poverty)]).range([0, width])
  
//     svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

//     // Add Y axis
//     var y = d3.scaleLinear()
//         .domain([d3.min(data, function(d) {return d.healthcare}), d3.max(data, function(d) {return d.healthcare})])
//         .range([height, 0]);
  
//     svg.append("g").call(d3.axisLeft(y));

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("cx", function (d) { return x(d.poverty); } )
//       .attr("cy", function (d) { return y(d.healthcare); } )
//       .attr("r", 1.5)
//       .style("fill", "#69b3a2")

})
