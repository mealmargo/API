const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div') // создали див

const formEl = document.createElement('form');
formEl.addEventListener('submit', async (e) => {
  e.preventDefault(); //чтобы при клике на поиск страница не обновилась
  const inputsValue = Object.fromEntries(new FormData(e.target)); // получить значения инпутов , object.fromEntries вернет массив в виде объекта , e target вся наша форма
  const response = await fetch(` https://api.github.com/users/${inputsValue.name} `); //создаем запрос на адрес
  
if (response.ok) {
    const data = await response.json(); //здесь будет лежать информация , которая придет от API
    wrapper.appendChild(createProfileEl(data)) 
    mainEl.appendChild(wrapper); //присваеваем main значения враппера
    inputEl.value = '';
  } else {
    const erriorMessage = document.createElement('h1');
    erriorMessage.textContent= "Пользователь не найден";
    mainEl.appendChild(erriorMessage)
  }
})

const inputEl = document.createElement('input');
inputEl.classList.add('search-input'); //дали класс инпуту
inputEl.setAttribute('name', 'name') // new formdata (7cтрочка) заберет значения инпута 

const searchButtonEl = document.createElement('button')
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = "Поиск";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

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
