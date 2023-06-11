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
    alert("Пользователь не найден")
  }
})
