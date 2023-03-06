import { locales } from "./locales";
import { options } from "./options";

const nameInput = document.querySelector('.name');
const cityInput = document.querySelector('.city');

export function setNameLocalStorage() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('city', cityInput.value);
}

export function getNameLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        cityInput.value = localStorage.getItem('city');
    }
}