import { renderGallery } from './gallery.js';
import { debounce } from './util.js';

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

let currentFilter = FilterOption.DEFAULT;

const repaint = function(evt, filter, data) {
  if (currentFilter !== filter) {
    const filteredData = FilterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());

    renderGallery(filteredData);

    const currentActiveElement = filterForm.querySelector('.img-filters__button--active');
    currentActiveElement.classList.remove('img-filters__button--active');

    evt.target.classList.add('img-filters__button--active');

    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint);

const initFilter = function(data) {
  filterElement.classList.remove('img-filters--inactive');

  defaultButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterOption.DEFAULT, data);
  });

  randomButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterOption.RANDOM, data);
  });

  discussedButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterOption.DISCUSSED, data);
  });
};

export { initFilter };
