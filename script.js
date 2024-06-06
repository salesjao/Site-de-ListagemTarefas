let myNodelist = document.getElementsByTagName("li");
for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);

    let editSpan = document.createElement("span");
    let editTxt = document.createTextNode("\u270E");
    editSpan.appendChild(editTxt);
    editSpan.className = "edit";
    myNodelist[i].appendChild(editSpan);
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
        // Remove do localStorage
        let taskToRemove = div.textContent.trim();
        removeTaskFromLocalStorage(taskToRemove);
    };
}

let list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    } else if (ev.target.classList.contains('edit')) {
        let li = ev.target.parentElement;
        let text = li.textContent;
        let originalTask = text.split('-')[1].trim();
        let category = text.split('-')[0].trim();
        let editedTask = prompt("Editar tarefa:", originalTask);
        if (editedTask !== null) {
            li.textContent = `${category} - ${editedTask}`;
            let span = document.createElement("span");
            let txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);

            let editSpan = document.createElement("span");
            let editTxt = document.createTextNode("\u270E");
            editSpan.className = "edit";
            editSpan.appendChild(editTxt);
            li.appendChild(editSpan);
        }
        // Atualizar no localStorage
        updateTaskInLocalStorage(text, `${category} - ${editedTask}`);
    }
}, false);

function addElemento() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("tarefa").value;
    let dateValue = document.getElementById("Data").value;
    let categoryValue = document.getElementById("categoria").value;

    if (inputValue === '' || dateValue === '') {
        alert("Você precisa preencher tanto a tarefa quanto a data.");
        return;
    }

    let task = {
        id: Date.now(), // Gerando um ID único usando a data atual
        category: categoryValue,
        date: dateValue,
        description: inputValue
    };

    let t = document.createTextNode(`${task.category} - ${task.date} - ${task.description}`);
    li.appendChild(t);

    document.getElementById("itemLista").appendChild(li);

    document.getElementById("tarefa").value = "";
    document.getElementById("Data").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    let editSpan = document.createElement("span");
    let editTxt = document.createTextNode("\u270E");
    editSpan.className = "edit";
    editSpan.appendChild(editTxt);
    li.appendChild(editSpan);

    // Salvar no localStorage
    saveTaskToLocalStorage(task);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskDescription) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.category + ' - ' + task.date + ' - ' + task.description !== taskDescription);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldTaskDescription, newTaskDescription) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.category + ' - ' + task.date + ' - ' + task.description === oldTaskDescription) {
            task.description = newTaskDescription.split('-')[1].trim();
            task.category = newTaskDescription.split('-')[0].trim();
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function limparLista() {
    let ul = document.getElementById("itemLista");
    ul.innerHTML = '';
    // Limpar o localStorage
    localStorage.removeItem('tasks');
}
