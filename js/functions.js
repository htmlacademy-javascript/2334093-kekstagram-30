// 1ая функция
const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength
}

// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true)
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));


// 2я функция, проверка на палиндром
const isPalindrom = function (string) {
  nospaceString = string.replaceAll(' ', '');
  modifiedString = string.toUpperCase(nospaceString);
  reversedString = '';

  for (let i = modifiedString.length - 1; i >= 0; i -= 1) {
    reversedString += modifiedString.at(i)
  }

  return modifiedString === reversedString ? 'да, это палиндром' : 'нет, не палиндром';
}

// Строка является палиндромом
console.log(isPalindrom('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrom('ДовОд')); // true
// Это не палиндром
console.log(isPalindrom('Кекс'));  // false

// 3 функция, извлекает числа

const getNumbers = function (element) {
  let numbers = '';
  if (!Number.isNaN(element)) {
    element = element.toString()
  }
  for (let i = 0; i <= element.length - 1; i++) {
    let indexNumber = parseInt(element.at(i), 10);
    if (!Number.isNaN(indexNumber)) {
      numbers += indexNumber;
    }
  }

  return parseInt(numbers, 10);
}
console.log(getNumbers('2023 год'));            // 2023
console.log(getNumbers('ECMAScript 2022'));     // 2022
console.log(getNumbers('1 кефир, 0.5 батона')); // 105
console.log(getNumbers('агент 007'));           // 7
console.log(getNumbers('а я томат'));           // NaN

console.log(getNumbers(2023)); // 2023
console.log(getNumbers(-1));   // 1
console.log(getNumbers(1.5));  // 15
