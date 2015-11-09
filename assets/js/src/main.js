"use strict";
require('flickity');
var _forEach = require('lodash/collection/forEach'),
    animate = require('animateplus'),
    books = document.querySelectorAll('.book'),
    bookLinks = document.querySelectorAll('.books__nav__link'),
    booksNav = document.querySelector('.books__nav'),
    booksToggle = document.querySelector('.books__nav__toggle'),
    container = document.querySelector('.container'),
    nav = document.querySelector('.nav'),
    next = document.querySelector('.nav--next'),
    prev = document.querySelector('.nav--prev');

var flkty = new Flickity(container, {
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  draggable: false,
  prevNextButtons: false
});

var state = {
  showingBooksNav: false,
  hashChecked: false
};

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

var handleBookLinkClick = function( event ) {
  selectByHash(event.target.href);
  handleBooksToggle();
};

var selectByHash = function( hash ) {
  _forEach(books, (book, i) => {
    if(book.getAttribute('data-path') === hash.split('#')[1])
      flkty.select(i);
  });
};

var handleBooksToggle = function() {
  if(state.showingBooksNav){
    hideBooksNav();
  } else {
    showBooksNav();
  }

  state.showingBooksNav = !state.showingBooksNav;
};

var hideBooksNav = function(){
  var top = nav.offsetTop;

  animate({
    el: nav,
    translateY: [(top * -1), 0],
    easing: 'easeOutExpo',
    duration: 750,
    begin: () => {
      nav.classList.remove('showing-books-nav');
    },
    complete: () => {
      booksNav.style.display = 'none';
      nav.style.top = 'auto';
      nav.style.bottom = '0';
    }
  });
};

var showBooksNav = function(){
  var top = nav.offsetTop;

  animate({
    el: nav,
    translateY: (top * -1),
    easing: 'easeOutExpo',
    duration: 750,
    begin: () => {
      nav.style.top = top + 'px';
      nav.style.bottom = 'auto';
      nav.classList.add('showing-books-nav');
      booksNav.style.display = 'block';
    }
  });
};

eventie.bind( document, 'keydown', handleKeyDown );
eventie.bind(booksToggle, 'click', handleBooksToggle );
eventie.bind(document.querySelector('.nav--collapse'), 'click', handleBooksToggle );
eventie.bind(next, 'click', () => flkty.next() );
eventie.bind(prev, 'click', () => flkty.previous() );
_forEach(bookLinks, (link) => eventie.bind(link, 'click', handleBookLinkClick) );

flkty.on('settle', () => {
  if(!state.hashChecked){
    state.hashChecked = true;

    if(window.location.hash && window.location.hash !== '')
      selectByHash(window.location.hash);
  }

  if(flkty.selectedIndex === 0){
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