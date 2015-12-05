var mod = (function () {
  function __init__(argument) {
    var width = 960,
        height = 500;

    var vertices = d3.range(100).map(function(d) {
      return [Math.random() * width, Math.random() * height];
    });

    var voronoi = d3.geom.voronoi().clipExtent([[0, 0], [width, height]]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)

    var path = svg.append("g").selectAll("path");

    svg.selectAll("circle")
        .data(vertices.slice(1))
        .enter().append("circle")
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("r", 1.5);

    // redraw(path);
  }

  function redraw(pa) {
    path = pa.data(voronoi(vertices), polygon);

    path.exit().remove();

    path.enter().append("path")
        .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
        .attr("d", polygon);

    path.order();
  }

  function polygon(d) {
    return "M" + d.join("L") + "Z";
  }

  return {
    init:__init__
  };

})();

mod.init()
