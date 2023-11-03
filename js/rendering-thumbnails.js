import {getDataArray} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const randomUserTemplate = document.querySelector('#picture').content.querySelector('.picture');

const usersData = getDataArray();
const picturesContainerFragment = document.createDocumentFragment();

usersData.forEach((url, description, likes, comments) => {
  const userElement = randomUserTemplate.cloneNode(true);
  userElement.querySelector('.picture__img').src = url;
  userElement.querySelector('.picture__img').alt = description;
  userElement.querySelector('.picture__likes').textContent = likes;
  userElement.querySelector('.picture__comments').textContent = comments;

  picturesContainerFragment.append(userElement);
});

picturesContainer.append(picturesContainerFragment);

export {picturesContainer};
