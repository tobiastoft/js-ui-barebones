var cols = 5;
var rows = 5;
var padding = {x: 50, y: 50};
var divs = [];
var t = 0.01;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(60);
  fill(0);
  stroke(255);

  createSpans();
}

function draw() {
  for (var x=0; x<divs.length; x++){
    for (var y=0; y<divs[x].length; y++){
      var n = noise(x+t, y+t);
      var weight = 100 + n * 800;
      var ital = n * 100;
      divs[x][y].elt.style.fontVariationSettings = '"wght" ' + weight + ', "ital" ' + ital;
    }
  }
  t+=0.1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//--

function createSpans(){
  for (var c=0; c<cols; c++){
    var divRow = [];
    for (var r=0; r<rows; r++){
      var x = r*padding.x;
      var y = c*padding.y;
      var div = createDiv('A').addClass('letter');
      div.position(x+50, y+50);
      divRow.push(div);
    }
    divs.push(divRow);
  }
}
