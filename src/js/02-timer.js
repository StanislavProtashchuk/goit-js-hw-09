import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const onDateInput = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
          start.disabled = true;
          return Notiflix.Notify.failure('Please choose a date in the future'); 
      }
      Notiflix.Notify.success('Great, lets start timing');
        console.log(selectedDates[0]);
      start.disabled = false;   
      
      start.addEventListener('click', timerOn);
        
      function timerOn(e) {         
        setInterval(() => {
          let timeDifference = selectedDates[0] - new Date();

          if (timeDifference > 0) {    
            addLeadingZero();
            
            days.textContent = `${convertMs(timeDifference).days}`;
            hours.textContent = `${convertMs(timeDifference).hours}`;
            minutes.textContent = `${convertMs(timeDifference).minutes}`;
            seconds.textContent = `${convertMs(timeDifference).seconds}`;
          }
        }, 1000);
        };
    },     
};

flatpickr(onDateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}
