const URL_SUBMIT = `http://localhost:3000/submit`;
const STATUS_OK = 200;
const TIMEOUT = 10000;
const ERR_BAD_CONNECTION = 'Ошибка соединения';
const ERR_TIMEOUT = 'Время ожидания истекло!';


const setXhrRequest = (request, onSuccess) => {
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

const onError = (status) => {
  console.log(status); // eslint-disable-line
}


const onUploadSuccess = () => {
  console.log(`succ sent`); // eslint-disable-line
}


export const submit = (data) => {
  const xhr = new XMLHttpRequest();

  setXhrRequest(xhr, onUploadSuccess);

  xhr.open("POST", URL_SUBMIT, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}
