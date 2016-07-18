'use strict';
(function() {

  var sendFormBtn = document.querySelector('.competition__submit');
  var acceptionPopUp = document.querySelector('.pop-up--acception');
  var acceptionPopUpClose = document.querySelector('.pop-up__btn-wrapper--acception .pop-up__close');

  sendFormBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    acceptionPopUp.classList.add('pop-up--opened');
  })

  acceptionPopUpClose.addEventListener('click', function() {
    acceptionPopUp.classList.remove('pop-up--opened');
  })
})();
