'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var order = document.querySelector('.buy').querySelector('form');
  var orderSuccsessModal = document.querySelector('.order__success');
  var orderErrorModal = document.querySelector('.order__error');
  var modalSuccessClose = orderSuccsessModal.querySelector('.modal__close');
  var modalErrorClose = orderErrorModal.querySelector('.modal__close');

  // успех
  var onModalSuccsessEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccsessOrder();
    }
  };

  var orderSuccsess = function () {
    orderSuccsessModal.classList.remove('modal--hidden');
    document.addEventListener('keydown', onModalSuccsessEscPress);
    order.reset();
  };

  var closeSuccsessOrder = function () {
    orderSuccsessModal.classList.add('modal--hidden');
    document.removeEventListener('keydown', onModalSuccsessEscPress);
  };

  modalSuccessClose.addEventListener('click', function () {
    closeSuccsessOrder();
  });
  //

  // ошибка
  var onModalErrorEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorOrder();
    }
  };

  var orderError = function (errorMessage) {
    orderErrorModal.classList.remove('modal--hidden');
    document.addEventListener('keydown', onModalErrorEscPress);
    var orderErrorCode = orderErrorModal.querySelector('.modal__error');
    orderErrorCode.textContent = errorMessage;
  };

  var closeErrorOrder = function () {
    orderErrorModal.classList.add('modal--hidden');
    document.removeEventListener('keydown', onModalErrorEscPress);
  };

  modalErrorClose.addEventListener('click', function () {
    closeErrorOrder();
  });
  //

  // отправка на сервер
  order.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(order), orderSuccsess, orderError);
    evt.preventDefault();
  });

})();