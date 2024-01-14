lucide.createIcons();

const DATE_PICKER_CONTAINER = document.getElementById('datePickerContainer');
const DATE_PICKER_TRIGGER = document.getElementById('dataPickerTrigger');
const DATE_PICKER = document.getElementById('dataPicker');
const DAYS_TAGS = document.querySelectorAll('#calendarDays li')
const CURRENT_MOUTH_AND_YEAR = document.getElementById('currentMouthAndYear')
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


console.log(CURRENT_MOUTH_AND_YEAR.innerText);
console.log();

document.addEventListener('click', (event) => {
  // Check if the clicked element is outside the DATE_PICKER_CONTAINER or not the trigger button
  if (!DATE_PICKER_CONTAINER.contains(event.target) && event.target !== DATE_PICKER_TRIGGER) {
    // Close the date picker
    DATE_PICKER.classList.add('hidden');
  }
});

// Event listener for trigger button click
DATE_PICKER_TRIGGER.addEventListener('click', () => {
  DATE_PICKER.classList.toggle('hidden');
});


DAYS_TAGS.forEach( day => {
  day.addEventListener('click', (event) => {
    const SELECTED_DAY = event.target.innerText
    const { YEAR, MONTH } = extractMonthAndYear(CURRENT_MOUTH_AND_YEAR.innerText)
    const mouthIndex = getNumOfMouth(MONTH, MONTHS)
    const selectedDateForInput = `${SELECTED_DAY}/${mouthIndex}/${YEAR}`
    const selectedDateForShow = `${SELECTED_DAY} de ${MONTH} de ${YEAR}`

    const showTextForUser = document.getElementById('textUser')
    showTextForUser.classList.remove('text-zinc-500')
    showTextForUser.classList.add('text-zinc-50')
    showTextForUser.textContent = selectedDateForShow
    DATE_PICKER.classList.add('hidden');
    console.log(selectedDateForInput, selectedDateForShow)
  })
})



function extractMonthAndYear(text) {
  const palavras = text.split(' ');

  // Extraia o ano (última palavra)
  const YEAR = parseInt(palavras.pop());

  // Junte novamente as palavras para obter o mês
  const MONTH = palavras.join(' ');

  return { YEAR, MONTH };
}


function getNumOfMouth(mes, arrayDeMeses) {
  const getIndex = arrayDeMeses.indexOf(mes) + 1

  return getIndex === 1 ? `0${getIndex}` : `${getIndex}`;
}