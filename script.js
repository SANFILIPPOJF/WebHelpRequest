// liens HTML
const selectUser = document.getElementById('selectUser');
const bodyTickets = document.getElementById('bodyTickets');
const buttonHelp = document.getElementById('help');
const ticketDescrip = document.getElementById('textDescrip');
const displayUser = document.getElementById('displayUser');
const nbtickets = document.getElementById('nbtickets');
const tickets_undone = document.getElementById('tickets_undone');
const buttonstat = document.getElementById('stat');
const statTotaux = document.getElementById('ticketTotaux');

buttonHelp.addEventListener('click', help);
buttonstat.addEventListener('click', statsUser);

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
        this.nbTickets = 0;
        this.ticketsUndone = 0;
    }
}

// definitions des tableaux 
var tabUser = [];
var tabTicket = [];
var tabTicketUndone = [];

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

// création du tableau HTML des tickets VALABLES non réalisés
function createTabTicket() {
    for (let j = 0; j < tabTicketUndone.length; j++) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = j + 1;
        const td1 = document.createElement("td");
        td1.textContent = tabUser.find (tab => tab.key == tabTicketUndone[j].users_id).username;
        const td2 = document.createElement("td");
        td2.textContent = tabTicketUndone[j].subject;
        const btnPass = document.createElement("button");
        btnPass.type = "button";
        btnPass.className = "btn btn-light container-sm row mt-5";
        btnPass.id = tabTicketUndone[j].key;
        btnPass.addEventListener('click', (event) => { btnTrash(event) });
        const iTrash = document.createElement("i");
        iTrash.className = "bi bi-trash fs-2 text-center";
        btnPass.appendChild(iTrash);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(btnPass);
        bodyTickets.appendChild(tr);
    }
}

// affiche les stats du user selectionné
function statsUser(){
    if (selectUser.value > 0){
        let x = selectUser.value-1;
        displayUser.textContent = tabUser[x].username;
        nbtickets.textContent = tabUser[x].nbTickets;
        statTotaux.textContent = `${Math.round((tabUser[x].nbTickets)/(tabTicket.length)*100)}%`
        tickets_undone.textContent = `${100-(Math.round((tabUser[x].ticketsUndone)/(tabUser[x].nbTickets)*100))}%`;
    }
}

// bouton trash (ticket réalisé)
function btnTrash(event) {
    const options = { method: 'PATCH', body: new URLSearchParams({}) };
    fetch(`https://webhelprequest.deta.dev/tickets/${event.srcElement.parentNode.id}`, options)
        .then(response => response.json())
        .then(response => {
            alert(response.data);
            location.reload();
        })
        .catch(err => alert(err));
}

// initialisation de la base users Method: Get
function refreshUsers(){
    fetch('https://webhelprequest.deta.dev/users',)
    .then(response => response.json())
    .then(response => {
        for (b = 0; b < response.data.length; b++) {
            tabUser.push(new User(response.data[b].key, response.data[b].username));
        }
        createSelectValue();
    })
    .catch(err => alert(err));
}

// initialisation de la base tickets Method: Get
function refreshTickets(){
    fetch('https://webhelprequest.deta.dev/tickets',)
    .then(response => response.json())
    .then(response => {
        for (c = 0; c < response.data.length; c++) {
            tabTicket.push(new Ticket(response.data[c].key, response.data[c].done, response.data[c].users_id, response.data[c].subject));
        }
        // creation de la table des tickets non réalisés et valables 
        let tabInter = tabTicket.filter(ticket => ticket.done == 0);
        tabTicketUndone = tabInter.filter(ticket => ticket.users_id.length == 12);
        for (d = 0; d < tabUser.length; d++){
            let tab = tabTicket.filter(ticket => ticket.users_id == tabUser[d].key)
            tabUser[d].nbTickets = tab.length;
            tabUser[d].ticketsUndone = tab.filter(ticket => ticket.done == 0).length;
        }
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
            body: new URLSearchParams({ done: 0, subject: ticketDescrip.value, userId: tabUser[(selectUser.value) - 1].key })
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