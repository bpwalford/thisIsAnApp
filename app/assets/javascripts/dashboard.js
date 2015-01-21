'use strict';

var things = [
  { val: 1},
  { val: 2},
  { val: 3},
  { val: 4},
  { val: 5},
  { val: 6},
  { val: 7},
  { val: 8},
  { val: 9},
];

var small  = 70;
var big    = 300;
var width  = '1000';
var height = '700';
var radius = '250';

// calculate node placement
function calculateTheta(i) {
  var scale = d3.scale.linear()
    .domain([0, things.length])
    .range([0, 2 * Math.PI]);
  return scale(i);
}

function calculateX(d, i) {
  var theta = calculateTheta(i);
  var x = (width/2) + radius * Math.sin(theta);
  d.x = x;
  return x;
}

function calculateY(d, i) {
  var theta = calculateTheta(i);
  var y = (height/2) + radius * Math.cos(theta);
  d.y = y;
  return y;
}

// helper functions
function randomRgbNum() {
  return Math.round(Math.random()*255).toString();
}

function collapseNodes(){
  svg.selectAll('.small')
    .transition()
    .attr('fill', 'orange');
}

function inflateNodes() {
  svg.selectAll('.small')
    .transition()
    .attr('fill', 'green');
}


// fingerprint canvas defaults
var svg = d3.select('#fingerprint')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var circles = svg.selectAll('circle')
  .data(things)
  .enter()
  .append('circle')

// default circle attributes
circles
  .attr('cx', function(d, i) {
    return calculateX(d, i);
  })
  .attr('cy', function(d, i) {
    return calculateY(d, i);
  })
  .attr('r', small)
  .attr('class', 'small')
  .attr('fill', function() {
    return  'rgb(' + randomRgbNum() + ', ' +
                     randomRgbNum() + ', ' +
                     randomRgbNum() + ')';
  })

// circles on click alterations
circles
  .on('click', function(d) {
    d3.select(this)
      .transition()
      .attr('class', (this.classList[0] === 'big' ? 'small' : 'big'))
      .attr('r', this.r = (this.r.animVal.value === small ? big : small))
      .attr('cx', function(d, i) {
        if (this.cx.animVal.value === width/2) {
          // inflateNodes();
          return d.x;
        } else {
          // collapseNodes();
          return width/2;
        }
      })
      .attr('cy', function(d, i) {
        if (this.cy.animVal.value === height/2) {
          return d.y;
        } else {
          return height/2;
        }
      });
  })

// var text = svg.selectAll('text')
//   .data(things)
//   .enter()
//   .append('text')
//
// text.attr('x', function(d) {
//     return (d * 100);
//   })
//   .attr('y', 200)
//   .text(function(d) { return d })
//   .attr('fill', 'black')
