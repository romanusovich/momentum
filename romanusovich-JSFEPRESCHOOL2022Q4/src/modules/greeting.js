import { locales } from "./locales";

const greetingSpan = document.querySelector('.greeting');

export function showGreeting() {
    greetingSpan.textContent = `${getTimeOfDay(document.documentElement.lang)}, `;
}

export function getTimeOfDay(lng) {
    const hour = (new Date()).getHours();
    const timeOfDay = locales[lng].greeting[Math.floor(hour / 6) * 6];
    return timeOfDay;
}