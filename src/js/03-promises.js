import Notiflix from 'notiflix';

const form = document.querySelector('.form');
let firstDelay = document.querySelector('[name="delay"]');
let delayStep = document.querySelector('[name="step"]');
let amount = document.querySelector('[name="amount"]');
let delay = Number(firstDelay.value);

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  for (let position = 1; position <= amount.value; position += 1){
  if(position > 1){
    delay += Number(delayStep.value);
    }
    createPromise(position, delay)
      .then(value => Notiflix.Notify.success(value))
      .catch(error => Notiflix.Notify.failure(error))
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
    });
  return promise;
}