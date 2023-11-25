import { bodyElement } from './big-picture';
import { isEscapeKey } from './util';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErorrText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_SYMBOLS: 'Неправильный хештег',
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadForm.querySelector('.img-upload__input');
const imageEditingForm = uploadForm.querySelector('.img-upload__overlay');
const closeImageEditingFormButton = imageEditingForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentDescriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openEditingFormModal = function() {
  imageEditingForm.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeEditingFormModal = function() {
  uploadImageInput.value = '';
  // uploadImageInput.reset();
  pristine.reset();
  imageEditingForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const isFieldFocused = function() {
  return document.activeElement === hashtagsInput ||
  document.activeElement === commentDescriptionInput;
};

const normalizeTags = function(tagString) {
  const toBoolean = function(tag) {
    return Boolean(tag.length);
  };

  return tagString.trim().split(' ').filter(toBoolean);
};

const validateHashtag = function(value) {
  const isValid = function(tag) {
    return VALID_SYMBOLS.test(tag);
  };

  return normalizeTags(value).every(isValid);
};

const validateHashtagSimilar = function(value) {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtagLimit = function(value) {
  return normalizeTags(value).length <= MAX_HASHTAG_COUNT;
};

const onUploadImageInputChange = function() {
  openEditingFormModal();
};

const onCloseImageEditingFormButtonClick = function() {
  closeEditingFormModal();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeEditingFormModal();
  }
}

const onFormSubmit = function(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

pristine.addValidator(
  hashtagsInput,
  validateHashtag,
  ErorrText.INVALID_SYMBOLS,
  1,
  true
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagSimilar,
  ErorrText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagLimit,
  ErorrText.INVALID_COUNT,
  3,
  true
);

uploadImageInput.addEventListener('change', onUploadImageInputChange);
closeImageEditingFormButton.addEventListener('click', onCloseImageEditingFormButtonClick);
uploadForm.addEventListener('submit', onFormSubmit);
