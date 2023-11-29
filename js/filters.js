import { renderGallery } from './gallery';

const MAX_RANDOM_FILTER = 10;

const FilterOption = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');

const getRandomIndex = function(min, max) {
  return Math.floor(Math.random() * (max - min));
};

const FilterHandlers = {
  [FilterOption.DEFAULT]: (data) => data,

  [FilterOption.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);

    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);

      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((i) => data[i]);
  },

  [FilterOption.DISCUSSED]: function(data) {
    return [...data].sort((item1, item2) => item2.comments.length - item1.comments.length);
  },
};

const repaint = function(filter, data) {
  const filteredData = FilterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());

  renderGallery(filteredData);

  const currentActive = filterForm.querySelector('.img-filters__button--active');
};

const initFilter = function(data) {
  filterElement.classList.remove('img-filters--inactive');

  defaultButton.addEventListener('click', () => {
    repaint(FilterOption.DEFAULT, data);
  });

  randomButton.addEventListener('click', () => {
    repaint(FilterOption.RANDOM, data);
  });

  discussedButton.addEventListener('click', () => {
    repaint(FilterOption.DISCUSSED, data);
  });
};

export { initFilter };
