//Make GeoJSON object plot polygons from gData

(function (projmap) {

// // // // // // // // // // // // // // // // // // // // // // // //  // //
//
// // // Make Map, Zoom Interaction
//
// // // // // // // // // // // // // // // // // // // // // // // //  // //

  var height = 450,
      width = 1100;
      //origional 450x1136!
      labelheight = 40;
      labelwidth = 120;

  var projection = d3.geo.albers()
    .scale(550000)
    .translate([100, -400])
    .rotate([105.2797,0])
    .center([0, 40.0176]);

  var path = d3.geo.path()
    .projection(projection);

  var map = d3.select("#projMap")
    .attr("width", width)
    .attr("height", height)
    .select("g").append("g").attr("id", "map");

  //"move element to front," snippet by trtg, see gist @ https://gist.github.com/trtg/3922684:

  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
    this.parentNode.appendChild(this);
    });
  };



  d3.json("data/mapdat4.json", function (error, dat) {

  map.append("path")
      .datum(topojson.feature(dat, dat.objects.streams))
      .attr("d", path)
      .attr("class", "streams");

  map.append("path")
      .datum(topojson.feature(dat, dat.objects.lakes))
      .attr("d", path)
      .attr("class", "lakes");

  map.append("path")
      .datum(topojson.feature(dat, dat.objects.streets))
      .attr("d", path)
      .attr("class", "localroad")
  });



      //Zoom-in Interaction
      d3.select(".downtown").selectAll("rect").on("click", function () {

        d3.select("#projMap").select("g")
        .attr("transform", "translate(" + -100 + "," + 3450 + ") rotate (-90) scale(" + 5.5 + ")");

        d3.selectAll(".neighborhoods")
        .transition().duration(800)
        .style("opacity", 0);


      });


      //Zoom-out Interaction
      d3.select("#projectWorld").on("click", function () {

        
        d3.select(".canvas").select("g")
        .transition()
        .duration(1800)
        .attr("transform", "translate(" + 0 + "," + 0 + ")scale(" + 1 + ")");

        d3.select(".canvas").selectAll("#sphere, .boundary")
        .transition()
        .duration(1800)
        .attr("transform", "translate(" + 0 + "," + 0 + ")scale(" + 1 + ")")
        .style("stroke-width", ".7px")


      });




    d3.selectAll("#map").attr("transform","rotate(90 90 90)")
    d3.selectAll(".neighborhoods").moveToFront();

    



})(this);

