const randomUserTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = function ({url, description, likes, comments, id}) {
  const thumbnail = randomUserTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = function (pictures, picturesContainer) {
  const picturesContainerFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);

    picturesContainerFragment.append(thumbnail);
  });

  picturesContainer.append(picturesContainerFragment);
};

export {renderThumbnails};
