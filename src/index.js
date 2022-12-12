import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { warningInfo, warningError } from './warningInfo';
import { createCountryList, createCountryInfo } from './createListElement';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    countryListItem: document.querySelector('.country-list'),
    countryCardInfo: document.querySelector('.country-info'),
    inputForm: document.getElementById('search-box')
};

const debounceDelay = debounce(searchCountry, DEBOUNCE_DELAY)
refs.inputForm.addEventListener('input', debounceDelay);

function searchCountry(e) {
    e.preventDefault();
  
    const inputValue = e.target.value.trim();

  if (!inputValue) {
    clearTemplate();
    return;
  }
    fetchCountries(inputValue)
    .then(data => {
        if (data.length > 10) {
            warningInfo();
            clearTemplate();
            return;
        }
        renderCountryCardItem(data);
    })
    .catch(Error => {
        clearTemplate();
        warningError();
    }); 
};

function renderCountryCardItem(el) {
    clearTemplate();
    
    if (el.length === 1) {
      const countryInfoMarkup = createCountryInfo(el);
        refs.countryCardInfo.innerHTML = countryInfoMarkup;
    } else { 
       const countryListMarkup = createCountryList(el);
        refs.countryListItem.innerHTML = countryListMarkup;
    }   
};

function clearTemplate() {
    refs.countryListItem.innerHTML = '';
    refs.countryCardInfo.innerHTML = '';
  };