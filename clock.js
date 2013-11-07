(function() {

  var fields = function() {
    var currentTime, hour, minute, second;
    currentTime = new Date();
    second = currentTime.getSeconds();
    minute = currentTime.getMinutes();
    hour = currentTime.getHours() + minute / 60;
    return data = [
      {
        "unit": "seconds",
        "numeric": second
      }, {
        "unit": "minutes",
        "numeric": minute
      }, {
        "unit": "hours",
        "numeric": hour
      }
    ];
  };

  var width = 400;
  var height = 200;
  var offSetX = 150;
  var offSetY = 100;

  var pi = Math.PI;
  var scaleSecs = d3.scale.linear()
                    .domain([0, 59 + 99/1000])
                    .range([0, 2 * pi]);
  var scaleMins = d3.scale.linear()
                    .domain([0, 59 + 59/60])
                    .range([0, 2 * pi]);
  var scaleHours = d3.scale.linear()
                     .domain([0, 11 + 59/60])
                     .range([0, 2 * pi])

  var vis = d3.selectAll(".chart")
          .append("svg:svg")
          .attr("width", width)
          .attr("height", height)

  var clockGroup = vis.append("svg:g")
              .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

  clockGroup.append("svg:circle")
            .attr("r", 80).attr("fill", "none")
            .attr("class", "clock outercircle")
            .attr("stroke", "#ecf0f1")
            .attr("fill", "#e74c3c")
            .attr("stroke-width", 2);


  clockGroup.append("svg:circle")
            .attr("r", 4)
            .attr("fill", "#ecf0f1")
            .attr("class", "clock innercircle")

  var render = function(data) {
    var hourArc, minuteArc, secondArc;

    clockGroup.selectAll(".clockhand").remove();

    secondArc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(70)
      .startAngle(function(d) {
        return scaleSecs(d.numeric);
      })
      .endAngle(function(d) {
        return scaleSecs(d.numeric);
      });

    minuteArc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(70)
      .startAngle(function(d) {
        return scaleMins(d.numeric);
      })
      .endAngle(function(d) {
        return scaleMins(d.numeric);
      });

    hourArc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(70)
      .startAngle(function(d) {
        return scaleHours(d.numeric);
      })
      .endAngle(function(d) {
        return scaleHours(d.numeric);
      });

      clockGroup.selectAll(".clockhand")
      .data(data)
      .enter()
      .append("svg:path")
      .attr("d", function(d) {
        if (d.unit === "seconds") {
          return secondArc(d);
        } else if (d.unit === "minutes") {
          return minuteArc(d);
        } else if (d.unit === "hours") {
          return hourArc(d)
        }
      })
      .attr("class", "clockhand")
      .attr("stroke", "#ecf0f1")
      .attr("stroke-width", function(d) {
        if (d.unit === "seconds") {
          return 2
        } else if (d.unit === "minutes" || d.unit === "hours") {
          return 3
        }
      })
      .attr("fill", "none");
  };

  setInterval(function() {
    var data;
    data = fields();
    return render(data);
  }, 1000);

}).call(this)