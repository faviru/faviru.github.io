'use strict';
(function() {

  var DESKTOP_WIDTH = 1200;
  var navMain = $('.main-nav');
  var navBtn = $('.main-nav__toggle');

  navMain.removeClass('main-nav--nojs');
  navMain.addClass('main-nav--closed');

  // Preventing default

  var appLinks = $('.app-download a');

  appLinks.click(function(evt) {
      evt.preventDefault();
  });

  navBtn.click(function() {
    if (navMain.hasClass('main-nav--closed')) {
      navMain.removeClass('main-nav--closed');
    } else {
      navMain.addClass('main-nav--closed');
    }
  });

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

  var btnNextReview = $('.reviews__btn--next');
  var btnPrevReview = $('.reviews__btn--prev');
  var sliderItems = $('.slider__item');
  var countItems = sliderItems.length - 1;

  btnNextReview.click(function() {
    var index = sliderItems.index(sliderItems.filter(':visible'));

    if (index == countItems) {
      $(sliderItems[countItems]).css('display', 'none');
      $(sliderItems[0]).css('display', 'flex');
    } else {
      $(sliderItems[index]).css('display', 'none');
      $(sliderItems[index + 1]).css('display', 'flex');
    }
  })

  btnPrevReview.click(function() {
    var index = sliderItems.index(sliderItems.filter(':visible'));

    if (index == 0) {
      $(sliderItems[0]).css('display', 'none');
      $(sliderItems[countItems]).css('display', 'flex');
    } else {
      $(sliderItems[index]).css('display', 'none');
      $(sliderItems[index - 1]).css('display', 'flex');
    }
  })

  $(window).resize(function() {
    if($(window).width() < DESKTOP_WIDTH) {
      sliderItems.removeAttr('style');
    }
  })
})();
