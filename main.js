lucide.createIcons();

const DATE_PICKER_CONTAINER = document.getElementById('datePickerContainer');
const DATE_PICKER_TRIGGER = document.getElementById('dataPickerTrigger');
const DATE_PICKER = document.getElementById('dataPicker');

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