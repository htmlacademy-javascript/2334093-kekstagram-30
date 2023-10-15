const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

checkStringLength('проверяемая строка', 20); // true)
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

const isPalindrom = function (string) {
  const nospaceString = string.replaceAll(' ', '');
  const modifiedString = string.toUpperCase(nospaceString);
  let reversedString = '';

  for (let i = modifiedString.length - 1; i >= 0; i -= 1) {
    reversedString += modifiedString.at(i);
  }

  return modifiedString === reversedString;
};

isPalindrom('топот'); // true
isPalindrom('ДовОд'); // true
isPalindrom('Кекс'); // false

const getNumbers = function (element) {
  let numbers = '';
  if (!Number.isNaN(element)) {
    element = element.toString();
  }
  for (let i = 0; i <= element.length - 1; i++) {
    const indexNumber = parseInt(element.at(i), 10);
    if (!Number.isNaN(indexNumber)) {
      numbers += indexNumber;
    }
  }

  return parseInt(numbers, 10);
};
getNumbers('2023 год'); // 2023
getNumbers('ECMAScript 2022'); // 2022
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('агент 007'); // 7
getNumbers('а я томат'); // NaN

getNumbers(2023); // 2023
getNumbers(-1); // 1
getNumbers(1.5); // 15
