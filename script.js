const selectUser = document.getElementById('selectUser');
const tickets = document.getElementById('tickets');
const bodyTickets = document.getElementById('bodyTickets');
const buttonHelp = document.getElementById('help');
const ticketDescrip = document.getElementById('textDescrip');

buttonHelp.addEventListener('click', help);

// Definition des classes d'objets (Ticket et User)
class Ticket {
    constructor(key = 0, done = 1, users_id = 0, subject = "") {
        this.key = key;
        this.done = done;
        this.users_id = users_id;
        this.subject = subject;
    }
}
class User {
    constructor(key = "", username = 0) {
        this.key = key;
        this.username = username;
    }
}

// definitions des tableaux 
let tabUser = [];
let tabTicket = [];
let tabTicketUndone = [];

// initialisation
refreshUsers();
refreshTickets();

// menu deroulant des username existants
function createSelectValue() {
    for (let i = 0; i < tabUser.length; i++) {
        const option = document.createElement("option");
        option.value = i + 1
        option.textContent = tabUser[i].username;
        selectUser.appendChild(option);
    }
}
// table des tickets non réalisés
function createTabTicket() {
    for (let j = 0; j < tabTicketUndone.length; j++) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = j + 1;
        const td1 = document.createElement("td");
        td1.textContent = findUser(tabTicketUndone[j].users_id);
        const td2 = document.createElement("td");
        td2.textContent = tabTicketUndone[j].subject;
        const btnPass = document.createElement("button");
        btnPass.type = "button";
        btnPass.className = "btn btn-light container-sm row mt-5";
        btnPass.id = tabTicketUndone[j].key;
        btnPass.addEventListener('click', (event) => { btnTrash(event) });
        const iTrash = document.createElement("i");
        iTrash.className = "bi bi-trash fs-2";
        btnPass.appendChild(iTrash);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(btnPass);
        bodyTickets.appendChild(tr);
    }
}
// bouton trash (ticket réalisé)
function btnTrash(event) {
    console.log(event.srcElement.parentNode.id);
    const options = { method: 'PATCH', body: new URLSearchParams({}) };

    fetch(`https://webhelprequest.deta.dev/tickets/${event.srcElement.parentNode.id}`, options)
        .then(response => response.json())
        .then(response => {
            alert(response.data);
            location.reload();
        })
        .catch(err => alert(err));
}
// fonction qui retourne l'username a partir de l'id
function findUser(idUser) {
    for (a = 0; a < tabUser.length; a++) {
        if (tabUser[a].key == idUser) {
            return tabUser[a].username;
        }
    }
    return
}

// initialisation de la base users
function refreshUsers(){
    fetch('https://webhelprequest.deta.dev/users',)
    .then(response => response.json())
    .then(response => {
        for (b = 0; b < response.data.length; b++) {
            tabUser.push(new User(response.data[b].key, response.data[b].username));
        }
        createSelectValue();
    })
    .catch(err => alertr(err));
}

// initialisation de la base tickets
function refreshTickets(){
    fetch('https://webhelprequest.deta.dev/tickets',)
    .then(response => response.json())
    .then(response => {
        for (c = 0; c < response.data.length; c++) {
            tabTicket.push(new Ticket(response.data[c].key, response.data[c].done, response.data[c].users_id, response.data[c].subject));
        }
        // creation d'une table des tickets non réalisés
        tabTicketUndone = tabTicket.filter(ticket => ticket.done == 0);
        createTabTicket();
    })
    .catch(err => alert(err));
}

// fonction qui envoie un ticket dans la base
function help() {
    if (selectUser.value == 0) {
        alert("Veuillez choisir un User");
    }else{
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ done: 0, subject: ticketDescrip, userId: tabUser[(selectUser.value) - 1].key })
        };
        fetch('https://webhelprequest.deta.dev/tickets', options)
            .then(response => response.json())
            .then(response => {
                alert("ticket envoyé");
                location.reload();
            })
            .catch(err => alert(err));
    }
}


/* post 
let response = fetch('https://webhelprequest.deta.dev/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(user)
})
    .then(response => response.json())
    .then(json => console.log(json)); */
