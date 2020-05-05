import countriesListTpl from '../tamplates/countriesListTpl.hbs';
import oneCountriTpl from '../tamplates/oneCountri.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import 'material-design-icons/iconfont/material-icons.css';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

const refs = {
  input: document.querySelector('.input'),
  countriesWrap: document.querySelector('.countriesList'),
  container: document.querySelector('.wrapper'),
};

const countriesContainer = document.querySelector('.countriesList');
const oneCountriContainer = document.querySelector('.aboutCountri');

function cleaner(){
  refs.input.value = "";
  countriesContainer.innerHTML = '';
  oneCountriContainer.innerHTML = '';
}

function fetchCountries(searchQuery) {
  fetch(searchQuery)
    .then(response => response.json())
    .then(data => {
      if (data.length > 10) {
        cleaner();
        PNotify.notice({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (data.length > 2 && data.length < 10) {
        cleaner();
        const countriesList = countriesListTpl(data);
        countriesContainer.insertAdjacentHTML('beforeend', countriesList);
      } else if (data.length === 1) {
        cleaner();
        const oneCountri = oneCountriTpl(data);
        oneCountriContainer.insertAdjacentHTML('beforeend', oneCountri);
      }
    });
}

export default fetchCountries;
