import {testKeyPressed} from './util';

const URL_SUBMIT = `http://localhost:3000/submit`;
const STATUS_OK = 200;
const TIMEOUT = 10000;
const ERR_BAD_CONNECTION = 'Ошибка соединения';
const ERR_TIMEOUT = 'Время ожидания истекло!';

var successPopupBlock = document.querySelector('.modal--success');
var errorPopupBlock = document.querySelector('.modal--error');
var errorMessageElement = errorPopupBlock.querySelector('.modal__message');

function onErrorCloseQuery(evt) {
  if (evt.target.classList.contains('modal__close') || evt.target.classList.contains('modal--error') || testKeyPressed(evt.keyCode, 'ESC')) {
    errorPopupBlock.classList.add('modal--hidden');
    errorPopupBlock.removeEventListener('click', onErrorCloseQuery);
    document.removeEventListener('keydown', onErrorCloseQuery);
  }
}

function onSuccessCloseQuery(evt) {
  if (evt.target.classList.contains('modal__close') || evt.target.classList.contains('modal--success') || window.util.testKeyPressed(evt.keyCode, 'ESC')) {
    successPopupBlock.classList.add('modal--hidden');
    successPopupBlock.removeEventListener('click', onSuccessCloseQuery);
    document.removeEventListener('keydown', onSuccessCloseQuery);
  }
}


const onError = (status) => {
  errorMessageElement.innerText = status;
  errorPopupBlock.classList.remove('modal--hidden');

  document.addEventListener('keydown', onErrorCloseQuery);
  errorPopupBlock.addEventListener('click', onErrorCloseQuery);
}


const onUploadSuccess = () => {
  successPopupBlock.classList.remove('modal--hidden');
  document.addEventListener('keydown', onSuccessCloseQuery);
  successPopupBlock.addEventListener('click', onSuccessCloseQuery);
}

const setXhrRequest = (request, onSuccess, onError) => {
  request.addEventListener('load', function () {
    if (request.status === STATUS_OK) {
      onSuccess(request.response);
    } else {
      onError('Код ошибки: ' + request.status + ' ' + request.statusText);
    }
  });

  request.addEventListener('error', function () {
    onError(ERR_BAD_CONNECTION);
  });
  request.addEventListener('timeout', function () {
    onError(ERR_TIMEOUT);
  });

  request.timeout = TIMEOUT;
}


export const submit = (data) => {
  const xhr = new XMLHttpRequest();

  setXhrRequest(xhr, onUploadSuccess, onError);

  xhr.open("POST", URL_SUBMIT, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}
