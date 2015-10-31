var Isotope = require('isotope');

var createGrid = function(){
  console.log('loaded');

  new Isotope('.highlights', {
    itemSelector: '.highlight',
    percentPosition: true,
    masonry: {
      columnWidth: document.querySelector('.highlight'),
      gutter: 0
    }
  });
};


// window.onload = createGrid;