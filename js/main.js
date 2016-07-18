'use strict';
(function() {

  var navMain = document.getElementsByClassName('main-nav')[0];
  var navBtn = document.getElementsByClassName('main-nav__toggle')[0];
  navMain.classList.remove('main-nav--nojs');
  navMain.classList.add('main-nav--closed');

  navBtn.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
    } else {
      navMain.classList.add('main-nav--closed');
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
})();
