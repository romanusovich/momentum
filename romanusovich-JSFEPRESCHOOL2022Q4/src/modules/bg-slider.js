import { getTimeOfDay } from "./greeting";
import { options } from "./options";

let randomNumber = getRandomNumber(1, 20); //Represents image number

export function setBg() {
    const timeOfDay = getTimeOfDay('en').split(' ')[1];
    const image = new Image();
    let url = '';
    switch (options.api) {
        case 'git':
            let imageNumber = randomNumber;
            if (randomNumber < 10) imageNumber = '0' + randomNumber;
            image.src = `https://raw.githubusercontent.com/romanusovich/stage1-tasks/assets/images/${timeOfDay}/${imageNumber}.jpg`;
            break;
        case 'unsplash':
            url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${options.tag}&client_id=lJkjV68Q5C8IgRUZOw0BRAc1HubRk5_9_J5LMbQTsxU`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    image.src = data.urls.regular;
                });
            break;
        case 'flickr':
            url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=af58bda12d77ec09059360bd9583d2b0&tags=${options.tag}&extras=url_l&format=json&nojsoncallback=1`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    image.src = data.photos.photo[getRandomNumber(0, data.photos.photo.length)].url_l;
                });
            break;
    }

    image.onload = () => document.body.style.backgroundImage = `url('${image.src}')`;
}

export function getSlideNext() {
    if (randomNumber + 1 > 20) randomNumber = 1;
    else randomNumber++;
    setBg();
}

export function getSlidePrev() {
    if (randomNumber - 1 < 1) randomNumber = 20;
    else randomNumber--;
    setBg();
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}