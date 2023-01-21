// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек

const display = () => {
  document.querySelector('.fruits__list').innerHTML = '';

  const newCard = () => {
    for (let i = 0; i < fruits.length; i++) {
      let itemParent = document.querySelector(".fruits__list");
      let newLi = document.createElement("li");
      newLi.className = "fruit__item";
      itemParent.appendChild(newLi);
      let newDiv = document.createElement("div");
      newDiv.className = "fruit__info";
      newLi.appendChild(newDiv);
      newDiv.innerHTML = `<div>index: ${i}</div>
      <div>kind: ${fruits[i].kind}</div>
      <div>color: ${fruits[i].color}</div>
      <div>weight (кг): ${fruits[i].weight}</div>`;

      if (fruits[i].color.includes("фиолетовый")) {
        newLi.classList.add("fruit_violet");
      }
      if (fruits[i].color.includes("зеленый") || fruits[i].color.includes("зелёный")) {
        newLi.classList.add("fruit_green");
      }
      if (fruits[i].color.includes("красный") || fruits[i].color.includes("розовый")) {
        newLi.classList.add("fruit_carmazin");
      }
      if (fruits[i].color.includes("желтый") || fruits[i].color.includes("жёлтый")) {
        newLi.classList.add("fruit_yellow");
      }
      if (fruits[i].color.includes("коричневый")) {
        newLi.classList.add("fruit_lightbrown");
      }
      if (fruits[i].color.includes("оранжевый")) {
        newLi.classList.add("fruit_orange");
      }
      if (fruits[i].color.includes("чёрный") || fruits[i].color.includes("черный")) {
        newLi.classList.add("fruit_black");
      }
      if (fruits[i].color.includes("белый") || fruits[i].color.includes("бежевый")) {
        newLi.classList.add("fruit_white");
      }
      if (fruits[i].color.includes("голубой") || fruits[i].color.includes("синий")) {
        newLi.classList.add("fruit_blue");
      } 
    }
  }
  newCard();
};

// первая отрисовка карточек
window.onload = display;

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let oldFruits = JSON.stringify(fruits); //Копия списка фруктов для сравнения.

  while (fruits.length > 0) {
    const randNumber = getRandomInt(0, fruits.length - 1);
    let tempFruit = fruits.splice(randNumber, 1);
    let temp = result.concat(tempFruit);
    result = temp;
    tempFruit = null;
    if (oldFruits === JSON.stringify(result)) {
      alert('Список не перемешался!');
    }
  }
  fruits = result;
  display();
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
let weightInputMin = document.querySelector(".minweight__input");
let weightInputMax = document.querySelector(".maxweight__input");

function checkWeight() {
  minValue = parseInt(weightInputMin.value);
  maxValue = parseInt(weightInputMax.value);

  function swapWeight() {
    let temp = maxValue;
    maxValue = minValue;
    minValue = temp; 
  }
  
  if (Number.isNaN(minValue) || minValue == '' || minValue < 0) {
    minValue = 0;
    weightInputMin.value = 0;
  } else {
      minValue = minValue;
    }

  if (Number.isNaN(maxValue) || maxValue == '' || maxValue < 0) {
    maxValue = weightInputMax.value = prompt('Введите корректное значения максимального веса!');
  } else {
      maxValue = maxValue;
    }

  if (maxValue < minValue) {
    swapWeight();
    weightInputMin.value = minValue;
    weightInputMax.value = maxValue;
  }
};

const filterFruits = () => { 
  checkWeight();
  if (newFruitList === undefined || newFruitList === null) {
    fruits = JSON.parse(fruitsJSON);
  } else {
      fruits = newFruitList;
    }

  const filteredFruits = fruits.filter(el => {
    const weight = el.weight;
    return weight >=(minValue) && weight <= (maxValue);
  })
  fruits = filteredFruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'quickSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (fruits1, fruits2) => {
  const priority = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'];
  const priority1 = priority.indexOf(fruits1.color[0]);
  const priority2 = priority.indexOf(fruits2.color[0]);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort: (fruits, comparationСolor) => {
    //arr - массив который нужно отсортировать по возрастанию.
    const n = fruits.length;
    //Внешняя итерация по элементам.
    for (let i = 0; i < n-1; i++) {
      let wasSwap = false;
      //Внутренняя итерация для перестановки элемента в конец массива.
      for (let j = 0; j < n-1-i; j++) {
        //Сравниваем элементы.
        if (comparationColor(fruits[j], fruits[j+1])) {
          //Делаем обмен элементов.
          [fruits[j], fruits[j+1]] = [fruits[j+1], fruits[j]];
          wasSwap = true;
        }
      }
      if (!wasSwap) break;
    }
  },

  quickSort: (fruits, comparationColor) => {
    function swap(fruits, leftIndex, rightIndex){
      [fruits[leftIndex], fruits[rightIndex]] = [fruits[rightIndex], fruits[leftIndex]];
    }
   
   // функция разделитель
    function partition(fruits, left, right) {
      var pivot = fruits[Math.floor((right + left) / 2)],
          i = left,
          j = right;
          console.log(pivot);
      while (i <= j) {
          while (fruits[i].color < pivot.color) {
              i++;
          }
          while (fruits[j].color > pivot.color) {
              j--;
          }
          if (i <= j) {
              swap(fruits, i, j);
              i++;
              j--;
          }
      }
      return i;
    }

   // алгоритм быстрой сортировки
    function quickSort(fruits, left, right) {
      var index;
      if (fruits.length > 1) {
          left = typeof left != "number" ? 0 : left;
          right = typeof right != "number" ? fruits.length - 1 : right;
          index = partition(fruits, left, right);
          if (left < index - 1) {
              quickSort(fruits, left, index - 1);
          }
          if (index < right) {
              quickSort(fruits, index, right);
          }
      }
      return fruits;
    }
    quickSort(fruits, comparationColor);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, fruits, comparationColor) {
    const start = new Date().getTime();
    sort(fruits, comparationColor);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  }
};

// инициализация полей

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // Переключение значения sortKind между 'bubbleSort' / 'quickSort'
  function changeSort() {
    if (sortKind === 'bubbleSort') {
      sortKind = 'quickSort';
      sortKindLabel.textContent = sortKind;
    } else {
        sortKind = 'bubbleSort';
        sortKindLabel.textContent = sortKind;
    }
  }
  changeSort();
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/
let newFruitList = null;

addActionButton.addEventListener('click', () => {
  function addFruit() {
    let inputAll = Array.from(document.querySelectorAll('#newFruitForm input'));
    let obj = {};
    let checkFieldsLength = inputAll.every((el) => el.value.length);
    if (checkFieldsLength) {
      for (const input of inputAll) {
        obj[input.id] = input.value;
      }
      fruits.push(obj);
      newFruitList = JSON.parse(JSON.stringify(fruits)); 
      return console.log(fruits),console.log(obj);
    }
    return alert('Не все поля заполнены'); 
  }
  addFruit();
  display(); 
});
