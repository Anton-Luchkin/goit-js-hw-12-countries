import './styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const refs = {
  input: document.querySelector('.input'),
  countriesWrap: document.querySelector('.countriesList'),
};

refs.input.addEventListener('input', 
debounce((event => {
  const searchQuery = `https://restcountries.eu/rest/v2/name/${event.target.value}`;
   
  fetchCountries(searchQuery)
}), 1000)
);
