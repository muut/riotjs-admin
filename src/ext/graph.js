
// A minimalistic line graph tool, not tested
$.fn.graph2 = function(data, color) {

  var graph = this;
      padd = 35,
      c = graph[0].getContext("2d"),
      max = Math.max.apply(0, data),
      width = graph.width(),
      height = graph.height(),
      len = data.length;

  // re-render? -> clear
  c.clearRect (0, 0, width, height);

  function getX(val) {
    return ((width - padd) / len) * val + (padd * 1.5);
  }

  function getY(val) {
    return height - (((height - padd) / max) * val) - padd;
  }

  c.strokeStyle = "#999";
  c.font = "12px " + $("body").css("fontFamily");
  c.fillStyle = "#666"
  c.textAlign = "center";

  // axises
  c.lineWidth = .5;
  c.beginPath();
  c.moveTo(padd, 0);
  c.lineTo(padd, height - padd);
  c.lineTo(width, height - padd);
  c.stroke();

  // x labels
  for(var i = 0; i < len; i++) {
    c.fillText(i, getX(i), height - padd + 20);
  }

  // y labels
  c.textAlign = "right"
  c.textBaseline = "middle";

  var steps = Math.round(max / 6 / 100) * 100;

  for(var i = 0; i < max; i += steps) {
    c.fillText(i, padd - 10, getY(i));
  }

  // lines
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(getX(0), getY(data[0]));

  for(var i = 1; i < len; i ++) {
    c.lineTo(getX(i), getY(data[i]));
  }

  c.strokeStyle = color;
  c.stroke();

};

