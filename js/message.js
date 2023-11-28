
const successMessageElement = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const erorMessageElement = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const hideMessage = function() {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = function() {
  hideMessage();
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')){
    return;
  }
  hideMessage();
}

const showMessage = function(element, buttonClass) {
  document.body.append(element);

  document.body.addEventListener('click', onBodyClick);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = function() {
  showMessage(successMessageElement, '.success__button');


};

const showErrorMessage = function() {
  showMessage(erorMessageElement, '.error__button');

};

export { showSuccessMessage, showErrorMessage };
