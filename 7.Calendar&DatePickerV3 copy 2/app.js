import DatePicker from './components/DatePicker.js';

[...document.querySelectorAll('link')]
  .at(-1)
  .insertAdjacentHTML('afterend', '<link href="components/theme.css" rel="stylesheet" />');

[...document.querySelectorAll('.date-picker-container')].forEach(DatePicker);
