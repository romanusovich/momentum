import { getRandomNumber } from "./bg-slider";

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

let quotesList;

export async function getData() {
    const url = './quotes.json';
    const res = await fetch(url);
    const data = await res.json();
    quotesList = data;
}

export function getQuotes() {
    if (typeof quotesList !== 'undefined') {
        const rand = getRandomNumber(0, quotesList.length);
        let textQ = quotesList[rand].text;
        let authorQ = quotesList[rand].author;

        if (document.documentElement.lang === 'ru') {
            translate(textQ, quote);
            translate(authorQ, author);
        }
        else {
            quote.textContent = textQ;
            author.textContent = authorQ;
        }
    }
    else setTimeout(getQuotes, 500);
}

function translate(text, elem) {
    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
        params: { langpair: 'en|ru', q: text, mt: '1', onlyprivate: '0', de: 'a@b.c' },
        headers: {
            'X-RapidAPI-Key': '333eda7badmshba57997f0515bc8p1a5697jsn8345ea5f15ba',
            'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        elem.textContent = response.data.responseData.translatedText;
    }).catch(function (error) {
        elem.textContent = error;
    });
}