import { locales } from "./locales";

export let options = {
    language: 'en',
    api: 'git',
    tag: 'nature',
    isNotVisible: []
}

const optionsBlock = document.querySelector('.options');
const selectedLanguage = document.querySelector('.lng-select');
const selectedApi = document.querySelector('.api-select');
const apiTag = document.querySelector('.api-tag');
const showHide = document.querySelector('.show-hide-group');

export function showOptions() {
    getOptions();
    apiChanged();
    setOptionsLocales();
    optionsBlock.classList.toggle('active');
}

export function saveOptions() {
    options.language = selectedLanguage.value;
    document.documentElement.lang = options.language;
    options.api = selectedApi.value;
    options.tag = apiTag.value;
    let hideThem = [];
    for (var child of showHide.children) {
        if (child.children[0].checked === false)
            hideThem.push(child.children[0].name);
    }
    options.isNotVisible = hideThem;
    setOptionsLocalStorage();
    location.reload();
}

export function getOptions() {
    getOptionsLocalStorage();
    selectedLanguage.value = options.language;
    document.documentElement.lang = options.language;
    selectedApi.value = options.api;
    apiTag.value = options.tag;
    for (var item of options.isNotVisible) {
        for (var child of showHide.children) {
            if (child.children[0].name === item)
                child.children[0].checked = false;
        }
        document.querySelector(`.${item}`).style.visibility = 'hidden';
        if (item === 'quote-of-day') document.querySelector('.change-quote').style.visibility = 'hidden';
    }
}

export function apiChanged() {
    if (selectedApi.value === 'git')
        apiTag.disabled = true;
    else apiTag.disabled = false;
}

function setOptionsLocalStorage() {
    localStorage.setItem('options', JSON.stringify(options));
}

function getOptionsLocalStorage() {
    if (localStorage.getItem('options')) {
        options = JSON.parse(localStorage.getItem('options'));
    }
}

function setOptionsLocales() {
    document.querySelector('.lng-span').textContent = locales[options.language].options.lngSpan;
    document.querySelector('.api-span').textContent = locales[options.language].options.apiSpan;
    document.querySelector('.api-tag-span').textContent = locales[options.language].options.apiTagSpan;
}