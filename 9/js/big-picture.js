import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;

const fullScreenPicture = document.querySelector('.big-picture');
const closePictureButton = fullScreenPicture.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');

const commentsContainer = fullScreenPicture.querySelector('.social__comments');
const commentTemplate = fullScreenPicture.querySelector('.social__comment');
const moreCommentsLoader = fullScreenPicture.querySelector('.comments-loader');
const commentCounts = fullScreenPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = fullScreenPicture.querySelector('.social__comment-total-count');

let commentsCountShown = 0;
let allComments = [];

const createComment = function ({name, avatar, message}) {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = function () {
  commentsCountShown += COMMENTS_TO_SHOW;

  if (commentsCountShown >= allComments.length) {
    moreCommentsLoader.classList.add('hidden');
    commentsCountShown = allComments.length;
  } else {
    moreCommentsLoader.classList.remove('hidden');
  }

  const commentsContainerFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(allComments[i]);
    commentsContainerFragment.append(comment);

  }
  commentCounts.textContent = commentsCountShown;
  totalCommentsCount.textContent = allComments.length;

  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsContainerFragment);
};

const onCommentsLoaderClick = function () {
  renderComments();
};

const renderPicture = function ({url, likes, description, comments}) {
  fullScreenPicture.querySelector('.big-picture__img img').src = url;
  fullScreenPicture.querySelector('.big-picture__img img').alt = description;
  fullScreenPicture.querySelector('.social__caption').textContent = description;
  fullScreenPicture.querySelector('.likes-count').textContent = likes;
  commentCounts.textContent = commentsCountShown;
  totalCommentsCount.textContent = comments.length;
};

const openPictureModal = function (pictureData) {
  fullScreenPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  allComments = pictureData.comments;
  if (allComments.length > 0) {
    renderComments();
  }

  renderPicture(pictureData);
};

const closePictureModal = function () {
  commentsCountShown = 0;

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
moreCommentsLoader.addEventListener('click', onCommentsLoaderClick);

export {openPictureModal, bodyElement};
