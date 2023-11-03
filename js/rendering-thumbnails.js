import {getDataArray} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const randomUserTemplate = document.querySelector('#picture').content.querySelector('.picture');

const usersData = getDataArray();
const picturesContainerFragment = document.createDocumentFragment();

usersData.forEach((user) => {
  const userElement = randomUserTemplate.cloneNode(true);
  userElement.querySelector('.picture__img').src = user.url;
  userElement.querySelector('.picture__img').alt = user.description;
  userElement.querySelector('.picture__likes').textContent = user.likes;
  userElement.querySelector('.picture__comments').textContent = user.comments.length;

  picturesContainerFragment.append(userElement);
});

picturesContainer.append(picturesContainerFragment);

export {picturesContainer};
