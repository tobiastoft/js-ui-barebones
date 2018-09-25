// Tobias Toft 2018
var startX = 0;
var startY = 0;
var weight = 100;
var width = 25;
var startWidth;
var startWeight;
var startItal;
var winHeight = window.innerHeight;


$('.status-button')._.bind('click', function(e){
  randomizeVars();
});


$$('.v-font')._.bind('touchstart', function(e){
  startX = e.touches[0].pageX;
  startY = winHeight - e.touches[0].pageY;

  var props = getProps(e.target);
  startWidth = parseInt(props.width);
  startWeight = parseInt(props.weight);
  startItal = parseInt(props.ital);

  this.classList.add('touching');
});

$$('.v-font')._.bind('touchend', function(e){
  e.target.classList.remove('touching');
});


$$('.v-font')._.bind('touchmove', function(e){
  e.preventDefault();

  var diffX = e.touches[0].pageX - startX;
  var diffY = (winHeight - e.touches[0].pageY - startY) * 3;

  weight = Math.round(_.clamp(startWeight + diffY, 100, 900));
  width = Math.round(_.clamp(startWidth + diffX, 0, 200));
  ital = Math.round(_.clamp(startWidth + diffX, 0, 100));

  updateStatusBar(weight, width, ital);
  setVars(e.target, weight, width, ital);
});



function setVars(elm, _weight, _width, _ital) {
  elm._.style({
    'font-variation-settings' : "'wght' " + _weight + ", 'wdth' " + _width + ", 'ital' " + _ital
  })
}


function updateStatusBar(weight, width, ital){
  $('.val-wdth').textContent = width;
  $('.val-wght').textContent = weight;
  $('.val-ital').textContent = ital;
}

function getProps(elm){
  var props = {
    weight,
    width,
    ital: 0
  }

  window.getComputedStyle(elm).fontVariationSettings.replace(/"/g, '').split(',').forEach(function(prop){
    var p = prop.trim().split(' ');
    if (p[0] === 'wght'){
      props.weight = p[1];
    } else if (p[0] === 'wdth') {
      props.width = p[1];
    } else if (p[0] === 'ital') {
      props.ital = p[1];
    }
  });

  return props;
}

function randomizeVars(){
  addAnimationClass(300);
  $$('.v-font').forEach(function(elm){
    var _weight = 100 + Math.random()*800;
    var _width = 0 + Math.random()*200;
    var _ital = 0 + Math.random()*200;

    setVars(elm, _weight, _width, _ital)
  });
}

function addAnimationClass(time){
  $$('.v-font').forEach(function(elm){
    elm.classList.add('animate');
  });

  setTimeout(function(elm){
    $$('.v-font').forEach(function(elm){
      elm.classList.remove('animate');
    });
  }, time);
}
