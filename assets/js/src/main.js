require('isotope-horizontal');
var Isotope = require('isotope');

var createGrid = function(){
  console.log('loaded');

  new Isotope('.container', {
    itemSelector: '.book',
    layoutMode: 'horizontal'
  });
};


createGrid();