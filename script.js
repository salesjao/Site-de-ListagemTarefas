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
    myNodelist[i].appendChild(editSpan);
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
    }
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

    let t = document.createTextNode(`${categoryValue} - ${dateValue} - ${inputValue}`);
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
}

function limparLista() {
    let ul = document.getElementById("itemLista");
    ul.innerHTML = '';
}
