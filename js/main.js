const PHOTO_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Хосе Гарсия',
];

const PHOTO_DESCRIPTION = [
  'Милый котик',
  'Собачка мальтипу',
  'Маяк на скале',
  'Артхаусные панельки',
  'Цвет настроения синий',
];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const createIdGenerator = function () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomArrayElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const createMessageData = function () {
  return Array.from(
    {length: getRandomInteger(1, 2)},
    () => getRandomArrayElement(COMMENT_MESSAGE)
  ).join(' ');
};

const createCommentsData = function () {
  return {
    id: createIdGenerator(),
    avatar: `img/avatar-${ getRandomInteger(1, AVATAR_COUNT) }.svg`,
    message: createMessageData(),
    name: getRandomArrayElement(NAMES),
  };
};

const createData = function (index) {
  return {
    id: index,
    url: `photos/${ index }.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createCommentsData),
  };
};

const createDataArray = function() {
  return Array.from({length: PHOTO_COUNT}, (_, pictureIndex) => createData(pictureIndex + 1));
};

createDataArray ();
