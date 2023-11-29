
const REMOVE_MESSAGE_TIMEOUT = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showErrorMessage = function() {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export { showErrorMessage, isEscapeKey };
