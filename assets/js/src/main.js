require('flickity');
var books = document.querySelectorAll('.book');
var container = document.querySelector('.container');
var next = document.querySelector('.nav--next');
var prev = document.querySelector('.nav--prev');

var flkty = new Flickity(container, {
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  draggable: false,
  prevNextButtons: false
});

var handleKeyDown = function( event ) {
  // Flickity only fires key navigation events when the container is in focus,
  // but we want it to always fire...
  if ( document.activeElement && document.activeElement == container )
    return;

  if ( event.keyCode == 37 ) {
    flkty.previous();
  } else if ( event.keyCode == 39 ) {
    flkty.next();
  }
};

eventie.bind( document, 'keydown', handleKeyDown );

next.addEventListener('click', () => {
  flkty.next();
}, false);

prev.addEventListener('click', () => {
  flkty.previous();
}, false);

flkty.on('settle', () => {
  if(flkty.selectedIndex == 0){
    prev.classList.add('is-inactive');
  } else {
    prev.classList.remove('is-inactive');
  }

  if(flkty.selectedIndex == books.length - 1){
    next.classList.add('is-inactive');
  } else {
    next.classList.remove('is-inactive');
  }
});