'use strict';
(function() {

  var DESKTOP_WIDTH = 1200;
  var navMain = $('.main-nav');
  var navBtn = $('.main-nav__toggle');

  // Preventing default

  var appLinks = $('.app-download a');

  appLinks.click(function(evt) {
      evt.preventDefault();
  });

  // Opening/Closing main menu

  navMain.removeClass('main-nav--nojs');
  navMain.addClass('main-nav--closed');

  navBtn.click(function() {
    if (navMain.hasClass('main-nav--closed')) {
      navMain.removeClass('main-nav--closed');
    } else {
      navMain.addClass('main-nav--closed');
    }
  });

  // Setting a map

  window.map = function() {
  var myLatLng = {lat: 59.93793239999999, lng: 30.323595899999987};

  var mapInit = new google.maps.Map(document.getElementById('map-block'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 15,
    disableDefaultUI: true
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: mapInit,
    icon: "../img/map-marker.png",
    });
  }

  // Review slider

  var btnNextReview = $('.reviews__btn--next');
  var btnPrevReview = $('.reviews__btn--prev');
  var sliderItems = $('.slider__item');
  var sliderList = $('.reviews__list');
  var countSlides = sliderItems.length;
  var slideWidth = sliderItems.width();
  var slideWrapper = slideWidth * countSlides;
  var sliderLeftPosition = 0;

  function setSliderContainer() {
    var pageWidth = $(".page__wrapper").width();

    if (pageWidth >= 1200) {
      sliderList.css('height', '210px');
      sliderItems.css('position', 'absolute');
      sliderLeftPosition = 0;
      slideWidth = sliderItems.width();
      setSlidePosition();
    } else {
      sliderList.css('height', 'auto');
      sliderItems.css({'position': 'relative', 'left': 0});
      slideWidth = sliderItems.css('width', 'auto');
    }
  }

  function setSlidePosition() {
    sliderItems.each(function(i) {
      sliderItems.eq(i).css('left', sliderLeftPosition);
      sliderItems.eq(i).css('width', slideWidth);
      sliderLeftPosition += slideWidth;
    });
  }

  setSliderContainer();

  $(window).resize(function() {
    slideWrapper = slideWidth * countSlides;
    setSliderContainer();
  });

  function slideItem(direction) {
    var currentSlide = parseInt(sliderList.data('current'));
    currentSlide += direction;

    if (currentSlide === countSlides) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = countSlides - 1;
    }

    sliderList
      .animate(
        {
          left: -currentSlide * slideWidth
        },
        300)
      .data('current', currentSlide);
  }

  btnNextReview.click(function() {
    slideItem(1);
  });

  btnPrevReview.click(function() {
    slideItem(-1);
  });

})();
