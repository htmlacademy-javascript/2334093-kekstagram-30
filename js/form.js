import { bodyElement } from './big-picture';
import { isEscapeKey } from './util';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadForm.querySelector('.img-upload__input');
const imageEditingForm = uploadForm.querySelector('.img-upload__overlay');
const closeImageEditingFormButton = imageEditingForm.querySelector('.img-upload__cancel');

const openEditingFormModal = function() {
  imageEditingForm.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeEditingFormModal = function() {
  imageEditingForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadImageInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onUploadImageInputChange = function() {
  openEditingFormModal();
};

const onCloseImageEditingFormButtonClick = function() {
  closeEditingFormModal();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditingFormModal();
  }
}

uploadImageInput.addEventListener('change', onUploadImageInputChange);
closeImageEditingFormButton.addEventListener('click', onCloseImageEditingFormButtonClick);
