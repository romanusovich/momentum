import { showGreeting } from "./greeting";

const timeClass = document.querySelector(".time");
const dateClass = document.querySelector(".date");

export function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeClass.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(document.documentElement.lang, options);
    dateClass.textContent = currentDate;
}