function serialize(arr) {
  let prev = 0;
  const sortedArr = arr.sort((a, b) => a - b);
  return sortedArr.map((num) => {
    const diff = num - prev;
    prev = num;
    return String.fromCharCode(diff + 32);
  }).join('');
}

function deserialize(str) {
  let prev = 0;
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    const diff = str.charCodeAt(i) - 32;
    arr.push(diff + prev);
    prev += diff;
  }
  return arr;
}

const testCases = [
  {
    name: 'Простой пример',
    input: [5, 10, 15],
  },
  {
    name: '50 чисел',
    input: Array.from({ length: 50 }, () => Math.floor(Math.random() *300) + 1),
  },
  {
    name: '100 чисел',
    input: Array.from({ length: 100 }, () => Math.floor(Math.random()* 300) + 1),
  },
  {
    name: '500 чисел',
    input: Array.from({ length: 500 }, () => Math.floor(Math.random() *300) + 1),
  },
  {
    name: '1000 чисел',
    input: Array.from({ length: 1000 }, () => Math.floor(Math.random()* 300) + 1),
  },
];

document.addEventListener('DOMContentLoaded', function () {
  const resultsDiv = document.getElementById('results');

  testCases.forEach((testCase) => {
    const serialized = serialize(testCase.input);
    const deserialized = deserialize(serialized);
    const compressionRatio = (serialized.length / JSON.stringify(testCase.input).length) * 100;

    const resultHTML = `
      <h2>${testCase.name}</h2>
      <p>Исходник: ${testCase.input.join(', ')}</p>
      <p>Сериализованные числа: ${serialized}</p>
      <p>Десериализованные: ${deserialized.join(', ')}</p>
      <p>Сколько сжалось: ${(compressionRatio).toFixed(2)}%</p>
    `;

    const testDiv = document.createElement('div');
    testDiv.innerHTML = resultHTML;
    resultsDiv.appendChild(testDiv);
  });
});
