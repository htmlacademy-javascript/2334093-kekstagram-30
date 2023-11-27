const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerButton = modalElement.querySelector('.scale__control--smaller');
const biggerButton = modalElement.querySelector('.scale__control--bigger');
const scaleInput = modalElement.querySelector('.scale__control--value');
const imgElement = modalElement.querySelector('.img-upload__preview img');

const scaleImg = function(value) {
  imgElement.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = function() {
  scaleImg(
    Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerButtonClick = function() {
  scaleImg(
    Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = function() {
  scaleImg(DEFAULT_SCALE);
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
