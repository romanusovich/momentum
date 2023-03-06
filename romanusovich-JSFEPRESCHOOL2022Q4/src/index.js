import { locales } from "./modules/locales";
import { setNameLocalStorage, getNameLocalStorage } from "./modules/local-storage";
import { showOptions, saveOptions, getOptions, apiChanged } from "./modules/options";
import { getData, getQuotes } from "./modules/quotes";
import { showTime } from "./modules/date-time";
import { setBg, getSlideNext, getSlidePrev } from "./modules/bg-slider";
import { getWeather } from "./modules/weather";
import * as player from "./modules/audio-player";
import { getItems, addItem } from "./modules/to-do";

document.querySelector('.name').placeholder = locales[document.documentElement.lang].placeholder;
document.querySelector('.city').value = locales[document.documentElement.lang].cityDefault;

window.addEventListener('load', getOptions);
window.addEventListener('load', getNameLocalStorage);
window.addEventListener('load', setBg);
window.addEventListener('load', showTime);
window.addEventListener('load', getWeather);
window.addEventListener('load', player.generatePlayList);
window.addEventListener('load', getItems);
window.addEventListener('load', getData);
window.addEventListener('load', getQuotes);

window.addEventListener('beforeunload', setNameLocalStorage);

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

const cityInput = document.querySelector('.city');
cityInput.addEventListener('change', getWeather);

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);

const play = document.querySelector('.play');
const next = document.querySelector('.play-next');
const prev = document.querySelector('.play-prev');
play.addEventListener('click', player.playPauseAudio);
next.addEventListener('click', player.playNext);
prev.addEventListener('click', player.playPrev);

const optionsButton = document.querySelector('.options-button');
const save = document.querySelector('.save-options');
const cancel = document.querySelector('.cancel-options');
const selectedApi = document.querySelector('.api-select');
optionsButton.addEventListener('click', showOptions);
save.addEventListener('click', saveOptions);
cancel.addEventListener('click', showOptions);
selectedApi.addEventListener('change', apiChanged);

const toDoAdd = document.querySelector('.to-do-add');
toDoAdd.addEventListener('click', addItem);