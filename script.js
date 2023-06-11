const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div');
wrapper.classList.add('users-wrapper'); // Добавляем класс 'users-wrapper' к элементу wrapper

// Функция для получения всех пользователей при загрузке страницы
async function fetchInitialUsers() {
  const response = await fetch('https://api.github.com/users?per_page=30'); // Запрос для получения первых 30 пользователей
  if (response.ok) {
    const data = await response.json(); // Получение данных в формате JSON
    data.forEach(user => {
      wrapper.appendChild(createProfileEl(user)); // Создание элементов профиля для каждого пользователя
    });
    mainEl.appendChild(wrapper); // Добавление всех профилей в основной элемент
  } else {
    console.error('Ошибка при получении пользователей');
  }
}

fetchInitialUsers();

const formEl = document.createElement('form');

// Обработчик события отправки формы
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputsValue = Object.fromEntries(new FormData(e.target));
  const response = await fetch(`https://api.github.com/users/${inputsValue.name}`);

  if (response.ok) {
    const data = await response.json();
    wrapper.innerHTML = ''; // Очищаем содержимое wrapper перед добавлением нового профиля
    wrapper.appendChild(createProfileEl(data));
    inputEl.value = '';
  } else {
    alert("Пользователь не найден");
  }
});

const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');

const searchButtonEl = document.createElement('button');
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = "Поиск";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

// Остальной код остается без изменений
function createProfileEl(profileData) {
  const element = document.createElement('div');
  element.classList.add('profile');

  element.innerHTML = `
    ${profileData.avatar_url ? `<img class="search-image" src=${profileData.avatar_url}></img>` : ''}
    ${profileData.name ? `<p class="search-text"><span>Имя: </span>${profileData.name}</p>` : 'Об этом пользователе нет информации'}
    ${profileData.location ? `<p class="search-text"><span>Город: </span>${profileData.location}</p>` : ''}
    ${profileData.bio ? `<p class="search-text"><span>О себе: </span>${profileData.bio}</p>` : ''}
  `;
  
  element.appendChild(createDeleteBtnEl());
  return element;
}

function createDeleteBtnEl() {
  const element = document.createElement('button');
  element.classList.add('delete-button');
  element.innerText = "Удалить";
  element.addEventListener('click', (e) => {
    wrapper.innerHTML = ''
  })

  return element
}
