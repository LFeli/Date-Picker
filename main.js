lucide.createIcons();

const DATE_PICKER_CONTAINER = document.getElementById('datePickerContainer');
const DATE_PICKER_TRIGGER = document.getElementById('dataPickerTrigger');
const DATE_PICKER = document.getElementById('dataPicker');
const CURRENT_MONTH_AND_YEAR = document.getElementById('currentMonthAndYear')
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const { YEAR, MONTH } = extractMonthAndYear(CURRENT_MONTH_AND_YEAR.innerText);
const { getIndex, indexFormatted } = getNumOfMonth(MONTH, MONTHS);

renderCalendar()
const DAYS_TAGS = document.querySelectorAll('#calendarDays li')

console.log(CURRENT_MONTH_AND_YEAR.innerText);

document.addEventListener('click', (event) => {
  // Check if the clicked element is outside the DATE_PICKER_CONTAINER or not the trigger button
  if (!DATE_PICKER_CONTAINER.contains(event.target) && event.target !== DATE_PICKER_TRIGGER) {
    // Close the date picker
    DATE_PICKER.classList.add('hidden');
    DATE_PICKER.classList.add('showElement');
  }
});

// Event listener for trigger button click
DATE_PICKER_TRIGGER.addEventListener('click', () => {
  DATE_PICKER.classList.toggle('hidden');
  DATE_PICKER.classList.add('showElement');
});


DAYS_TAGS.forEach(day => {
  day.addEventListener('click', (event) => {
    const SELECTED_DAY = event.target;

    // Remova a classe 'bg-zinc-100' de todos os dias
    DAYS_TAGS.forEach(otherDay => {
      if (otherDay !== SELECTED_DAY) {
        otherDay.classList.remove('bg-zinc-100');
        otherDay.classList.add('text-zinc-200'); // Adicione a classe de texto padrão de volta
        otherDay.classList.remove('text-zinc-800'); // Remova a classe de texto extra
      }
    });

    // Adicione a classe 'bg-zinc-100' apenas ao dia clicado
    SELECTED_DAY.classList.add('bg-zinc-100');
    SELECTED_DAY.classList.remove('text-zinc-200');
    SELECTED_DAY.classList.add('text-zinc-800');

    console.log(SELECTED_DAY);

    const SELECTED_DAY_VALUE = event.target.innerText;
    const selectedDateForInput = `${SELECTED_DAY_VALUE}/${indexFormatted}/${YEAR}`;
    const selectedDateForShow = `${SELECTED_DAY_VALUE} de ${MONTH} de ${YEAR}`;

    const showTextForUser = document.getElementById('textUser');
    showTextForUser.classList.remove('text-zinc-500');
    showTextForUser.classList.add('text-zinc-50');
    showTextForUser.textContent = selectedDateForShow;

    DATE_PICKER.classList.add('hidden');
    console.log(selectedDateForInput, selectedDateForShow);
  });
});



function extractMonthAndYear(text) {
  const palavras = text.split(' ');

  // Extraia o ano (última palavra)
  const YEAR = parseInt(palavras.pop());

  // Junte novamente as palavras para obter o mês
  const MONTH = palavras.join(' ');

  return { YEAR, MONTH };
}


function getNumOfMonth(mes, arrayDeMeses) {
  const getIndex = arrayDeMeses.indexOf(mes) + 1
  const indexFormatted = getIndex === 1 ? `0${getIndex}` : `${getIndex}`;

  return { getIndex, indexFormatted };
}

function renderCalendar() {
  let GET_FIRST_DAY_OF_MONTH = new Date(YEAR, getIndex - 1, 1).getDay()
  let GET_LAST_DAY_OF_MONTH = new Date(YEAR, getIndex, 0).getDate()
  let GET_FIRSTS_DAYS_OF_NEXT_MONTH = new Date(YEAR, getIndex - 1, GET_LAST_DAY_OF_MONTH).getDay();
  let GET_LASTS_DAYS_OF_PREVIOUS_MONTH = new Date(YEAR, getIndex - 1, 0).getDate();

  let liTag = "";

  // Adiciona os dias do mês anterior
  for (let i = GET_FIRST_DAY_OF_MONTH; i > 0; i--) {
    liTag += ` <li data-inactive class="hover:bg-zinc-800 rounded py-2 cursor-pointer transition-colors text-zinc-500 ">${GET_LASTS_DAYS_OF_PREVIOUS_MONTH - i + 1}</li>`;
  }

  // Adiciona os dias do mês atual
  for (let i = 1; i <= GET_LAST_DAY_OF_MONTH; i++) {
    let isToday =
      i === new Date().getDate() &&
      GET_FIRST_DAY_OF_MONTH === new Date(YEAR, getIndex - 1, 1).getDay() &&
      (getIndex - 1) === new Date().getMonth() &&
      YEAR === new Date().getFullYear() ? 'active' : '';

    liTag += isToday === 'active' ? 
      ` <li data-today class="bg-zinc-700 hover:bg-zinc-800 rounded py-2 cursor-pointer transition-colors text-zinc-200 hover:text-zinc-200">${i}</li>` :
      ` <li class="hover:bg-zinc-800 rounded py-2 cursor-pointer transition-colors text-zinc-200 hover:text-zinc-200">${i}</li>`;
  }

  // Adiciona os dias da próxima semana, se necessário
  for (let i = GET_FIRSTS_DAYS_OF_NEXT_MONTH; i < 6; i++) {
    liTag += ` <li data-inactive class="hover:bg-zinc-800 rounded py-2 cursor-pointer transition-colors text-zinc-500 ">${i - GET_FIRSTS_DAYS_OF_NEXT_MONTH + 1}</li>`;
  }

  // console.log(liTag);

  document.getElementById('calendarDays').innerHTML = liTag

  console.log('GET_FIRST_DAY_OF_MOnth',GET_FIRST_DAY_OF_MONTH );
  console.log('GET_LAST_DAY_OF_MONTH',GET_LAST_DAY_OF_MONTH);
  console.log('GET_FIRSTS_DAYS_OF_NEXT_MONTH',GET_FIRSTS_DAYS_OF_NEXT_MONTH);
  console.log('GET_LASTS_DAYS_OF_PREVIOUS_MONTH',GET_LASTS_DAYS_OF_PREVIOUS_MONTH);
  console.log(YEAR, getIndex);
}
