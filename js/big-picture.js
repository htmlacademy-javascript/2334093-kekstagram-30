import {isEscapeKey} from './util.js';

const fullScreenPicture = document.querySelector('.big-picture');
const commentCount = fullScreenPicture.querySelector('.social__comment-count');
const commentLoader = fullScreenPicture.querySelector('.comments-loader');
const closePictureButton = fullScreenPicture.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentsContainer = fullScreenPicture.querySelector('.social__comments');
const commentTemplate = fullScreenPicture.querySelector('.social__comment');

const createComment = function ({name, avatar, message}) {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = function ({comments}) {
  const commentsContainerFragment = document.createDocumentFragment();

  comments.forEach((element) => {
    const comment = createComment(element);
    commentsContainerFragment.append(comment);
  });

  commentsContainer.append(commentsContainerFragment);
};

const renderPicture = function ({url, likes, description, comments}) {
  fullScreenPicture.querySelector('.big-picture__img img').src = url;
  fullScreenPicture.querySelector('.big-picture__img img').alt = description;
  fullScreenPicture.querySelector('.social__caption').textContent = description;
  fullScreenPicture.querySelector('.likes-count').textContent = likes;
  fullScreenPicture.querySelector('.social__comment-shown-count').textContent = '10';
  fullScreenPicture.querySelector('.social__comment-total-count').textContent = comments.length;
};

const openPictureModal = function (pictureData) {
  fullScreenPicture.classList.remove('hidden');

  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');

  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  renderPicture(pictureData);
  renderComments(pictureData);
};

const closePictureModal = function () {
  fullScreenPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onClosePictureButtonClick = function () {
  closePictureModal();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
}

closePictureButton.addEventListener('click', onClosePictureButtonClick);

export {openPictureModal};
