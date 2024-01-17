lucide.createIcons();

const DATE_PICKER_CONTAINER = document.getElementById('datePickerContainer');
const DATE_PICKER_TRIGGER = document.getElementById('dataPickerTrigger');
const DATE_PICKER = document.getElementById('dataPicker');
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

let GET_DATE = new Date();
let GET_CURRENT_YEAR = GET_DATE.getFullYear();
let GET_CURRENT_MONTH = GET_DATE.getMonth();
const CURRENT_MONTH_AND_YEAR = document.getElementById('currentMonthAndYear')

const PREVIOUS_AND_NEXT_BUTTON = document.querySelectorAll('#buttons button')

renderCalendar()
const DAYS_TAGS = document.querySelectorAll('#calendarDays li')

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

function formateIndex(index) {
  const monthIndexFormatted = index < 10 ? `0${index + 1}` : `${index + 1}`;

  return monthIndexFormatted;
}

function renderCalendar() {
  let GET_FIRST_DAY_OF_MONTH = new Date(GET_CURRENT_YEAR, GET_CURRENT_MONTH, 1).getDay()
  let GET_LAST_DAY_OF_MONTH = new Date(GET_CURRENT_YEAR, GET_CURRENT_MONTH + 1, 0).getDate()
  let GET_FIRSTS_DAYS_OF_NEXT_MONTH = new Date(GET_CURRENT_YEAR, GET_CURRENT_MONTH, GET_LAST_DAY_OF_MONTH).getDay();
  let GET_LASTS_DAYS_OF_PREVIOUS_MONTH = new Date(GET_CURRENT_YEAR, GET_CURRENT_MONTH, 0).getDate();

  let liTag = "";

  // Adiciona os dias do mês anterior
  for (let i = GET_FIRST_DAY_OF_MONTH; i > 0; i--) {
    liTag += ` <li data-inactive="true" class="hover:bg-zinc-800 rounded py-2 cursor-pointer transition-colors text-zinc-500 ">${GET_LASTS_DAYS_OF_PREVIOUS_MONTH - i + 1}</li>`;
  }

  // Adiciona os dias do mês atual
  for (let i = 1; i <= GET_LAST_DAY_OF_MONTH; i++) {
    let isToday =
      i === GET_DATE.getDate() &&
      GET_FIRST_DAY_OF_MONTH === new Date(GET_CURRENT_YEAR, GET_CURRENT_MONTH, 1).getDay() &&
      GET_CURRENT_MONTH === new Date().getMonth() &&
      GET_CURRENT_YEAR === new Date().getFullYear() ? 'active' : '';

    liTag += isToday === 'active' ? 
      ` <li data-today="true" class="bg-zinc-700 hover:bg-zinc-800 rounded py-2 cursor-pointer transition-colors text-zinc-200 hover:text-zinc-200">${i}</li>` :
      ` <li class="hover:bg-zinc-800 rounded py-2 cursor-pointer transition-colors text-zinc-200 hover:text-zinc-200">${i}</li>`;
  }

  // Adiciona os dias da próxima semana, se necessário
  for (let i = GET_FIRSTS_DAYS_OF_NEXT_MONTH; i < 6; i++) {
    liTag += ` <li data-inactive="true" class="hover:bg-zinc-800 rounded py-2 cursor-pointer transition-colors text-zinc-500 ">${i - GET_FIRSTS_DAYS_OF_NEXT_MONTH + 1}</li>`;
  }

  // console.log(liTag);

  CURRENT_MONTH_AND_YEAR.innerText = `${MONTHS[GET_CURRENT_MONTH]} ${GET_CURRENT_YEAR}`
  document.getElementById('calendarDays').innerHTML = liTag

  console.log('GET_FIRST_DAY_OF_MOnth',GET_FIRST_DAY_OF_MONTH );
  console.log('GET_LAST_DAY_OF_MONTH',GET_LAST_DAY_OF_MONTH);
  console.log('GET_FIRSTS_DAYS_OF_NEXT_MONTH',GET_FIRSTS_DAYS_OF_NEXT_MONTH);
  console.log('GET_LASTS_DAYS_OF_PREVIOUS_MONTH',GET_LASTS_DAYS_OF_PREVIOUS_MONTH);
  console.log(GET_CURRENT_YEAR, GET_CURRENT_MONTH);
}

PREVIOUS_AND_NEXT_BUTTON.forEach( button => {
  button.addEventListener('click', () => {
    GET_CURRENT_MONTH = button.id === 'prev' ?
      GET_CURRENT_MONTH - 1 :
      GET_CURRENT_MONTH + 1;

      console.log(GET_CURRENT_MONTH);

    if( GET_CURRENT_MONTH < 0 || GET_CURRENT_MONTH > 11) {
      GET_DATE = new Date(GET_CURRENT_YEAR, GET_CURRENT_MONTH)
      GET_CURRENT_YEAR = GET_DATE.getFullYear()
      GET_CURRENT_MONTH = GET_DATE.getMonth()
    } else {
      GET_DATE = new Date()
    }

    renderCalendar()
  })
})

document.querySelectorAll('#calendarDays').forEach(day => {
  day.addEventListener('click', (event) => {
    const SELECTED_DAY = event.target;
    let SELECTED_DAY_VALUE = event.target.innerText;
    let cleanedValue = SELECTED_DAY_VALUE.replace(/\s/g, '');

    if (/^\d{1,2}$/.test(cleanedValue)) {
      console.log(SELECTED_DAY)

      DAYS_TAGS.forEach(otherDay => {
        if (otherDay !== SELECTED_DAY) {

          otherDay.classList.remove('bg-zinc-100');
          otherDay.classList.remove('bg-zinc-800');
          otherDay.classList.remove('text-zinc-800');
          otherDay.classList.remove('text-zinc-600');
          otherDay.classList.add('text-zinc-200');
        }
      });

      if (SELECTED_DAY.getAttribute('data-inactive') === 'true') {
        // Adiciona o estilo adicional para inativos
        SELECTED_DAY.classList.add('bg-zinc-800');
        SELECTED_DAY.classList.add('text-zinc-600');
      } else {
        SELECTED_DAY.classList.add('bg-zinc-100');
        SELECTED_DAY.classList.remove('text-zinc-200');
        SELECTED_DAY.classList.add('text-zinc-800');
      }


      console.log(SELECTED_DAY);

      const FORMATTED_MONTH_INDEX = formateIndex(GET_CURRENT_MONTH);
      let selectedDateForInput = `${SELECTED_DAY_VALUE}/${FORMATTED_MONTH_INDEX}/${GET_CURRENT_YEAR}`;
      let selectedDateForShow = `${SELECTED_DAY_VALUE} de ${MONTHS[GET_CURRENT_MONTH]} de ${GET_CURRENT_YEAR}`;

      const showTextForUser = document.getElementById('textUser');
      showTextForUser.classList.remove('text-zinc-500');
      showTextForUser.classList.add('text-zinc-50');
      showTextForUser.textContent = selectedDateForShow;

      DATE_PICKER.classList.add('hidden');
      console.log(selectedDateForInput, selectedDateForShow);
    } 
  });
});