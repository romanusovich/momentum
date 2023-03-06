let toDoList = [];

const toDoContainer = document.querySelector('.to-do');
const toDoItems = document.querySelectorAll('.to-do-item');
const toDoName = document.querySelector('.to-do-input');

export function addItem() {
    if (toDoName.value.length > 0) {
        const item = {
            isDone: false,
            title: toDoName.value
        };
        toDoList.push(item);

        const li = document.createElement('li');
        li.classList.add('to-do-item');

        const input = document.createElement('input');
        input.type = 'checkbox'; input.name = toDoName.value;
        input.id = toDoList.length - 1;
        input.classList.add('is-done');

        const span = document.createElement('span');
        span.textContent = toDoName.value;
        span.classList.add('to-do-task');

        input.addEventListener('click', (e) => {
            span.classList.toggle('active');
            toDoList[e.target.id].isDone = !toDoList[e.target.id].isDone;
            setLocalStorage();
        });

        const trash = document.createElement('div');
        trash.classList.add('to-do-delete');
        trash.classList.add('icono-trash');
        trash.addEventListener('click', (e) => {
            const index = e.target.previousSibling.previousSibling.id;
            toDoList.splice(index, 1);
            document.getElementById(index).parentElement.remove();

            let id = 0;
            const checkboxes = document.querySelectorAll('.is-done');
            for (var box of checkboxes) {
                box.id = id; 
                id++;
            }

            setLocalStorage();
        });

        li.append(input); li.append(span); li.append(trash);
        toDoContainer.append(li);

        setLocalStorage();
    }
}

export function getItems() {
    getLocalStorage();
    let index = 0;
    for (var item of toDoList) {
        const li = document.createElement('li');
        li.classList.add('to-do-item');

        const input = document.createElement('input');
        input.type = 'checkbox'; input.name = item.title;
        input.checked = item.isDone; input.id = index;
        input.classList.add('is-done');

        const span = document.createElement('span');
        span.textContent = item.title;
        span.classList.add('to-do-task');
        if (item.isDone) span.classList.add('active');

        input.addEventListener('click', (e) => {
            span.classList.toggle('active');
            toDoList[e.target.id].isDone = !toDoList[e.target.id].isDone;
            setLocalStorage();
        });

        const trash = document.createElement('div');
        trash.classList.add('to-do-delete');
        trash.classList.add('icono-trash');
        trash.addEventListener('click', (e) => {
            const index = e.target.previousSibling.previousSibling.id;
            toDoList.splice(index, 1);
            document.getElementById(index).parentElement.remove();

            let id = 0;
            const checkboxes = document.querySelectorAll('.is-done');
            for (var box of checkboxes) {
                box.id = id; 
                id++;
            }

            setLocalStorage();
        });

        li.append(input); li.append(span); li.append(trash);
        toDoContainer.append(li);

        index++;
    }
}

function getLocalStorage() {
    if (localStorage.getItem('toDoItems')) {
        toDoList = JSON.parse(localStorage.getItem('toDoItems'));
    }
}

function setLocalStorage() {
    localStorage.setItem('toDoItems', JSON.stringify(toDoList));
}