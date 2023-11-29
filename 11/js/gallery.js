import { renderThumbnails } from './rendering-thumbnails';
import {openPictureModal} from './big-picture';

const picturesContainer = document.querySelector('.pictures');

const renderGallery = function (pictures) {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const pictureData = pictures.find(({ id }) => id === thumbnailId);
    openPictureModal(pictureData);

  });

  renderThumbnails(pictures, picturesContainer);
};

export { renderGallery };
