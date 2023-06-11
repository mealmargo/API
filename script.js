const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div') // создали див

const formEl = document.createElement('form');
formEl.addEventListener('submit', async (e) => {
  e.preventDefault(); //чтобы при клике на поиск страница не обновилась
  const inputsValue = Object.fromEntries(new FormData(e.target)); // получить значения инпутов , object.fromEntries вернет массив в виде объекта , e target вся наша форма
  const response = await fetch(` https://api.github.com/users/${inputsValue.name} `); //создаем запрос на адрес
