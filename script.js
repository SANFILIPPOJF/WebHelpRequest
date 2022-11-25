const selectUser = document.getElementById('selectUser');
const tickets = document.getElementById('tickets');
const buttonNext = document.getElementById('next');
const buttonHelp = document.getElementById('help');

buttonNext.addEventListener('click', next);
buttonHelp.addEventListener('click', help);
// Definition des classes d'objets
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

function createSelectValue() {
    for (let i = 0; i < tabUser.length; i++) {
        const option = document.createElement("option");
        option.value = i + 1
        option.textContent = tabUser[i].username;
        selectUser.appendChild(option);
    }
}

function createTabTicket() {
    for (let i = 0; i < tabTicket.length; i++) {
        if (tabTicket[i].done == 0) {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            th.textContent = i + 1;
            const td1 = document.createElement("td");
            td1.textContent = findUser(tabTicket[i].users_id);
            const td2 = document.createElement("td");
            td2.textContent = tabTicket[i].subject;
            const btnPass = document.createElement("button");
            btnPass.type = "button";
            btnPass.className = "btn btn-light container-sm fs-6 p-2 w25 mt-5"
            btnPass.id = `btnPass${i}`
            const iArrow = document.createElement("i");
            iArrow.className = "bi bi-trash fs-3"
            btnPass.appendChild(iArrow);
            tr.appendChild(th);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(btnPass);
            tickets.appendChild(tr);
            if (i == tabTicket.length - 1) {
                btnPass.className = "invisible bi bi-trash container-sm fs-6 p-2 w25 mt-5"
            }
        }
    }
}

function findUser(id) {
    for (a = 0; a < tabUser.length; a++) {
        if (tabUser[a].key == id) {
            return tabUser[a].username;
        }
    }
    return "anonymious";
}

// get users
fetch('https://webhelprequest.deta.dev/users',)
    .then(response => response.json())
    .then(response => {
        console.log("length", response.data.length);
        console.log(response.data);
        for (i = 0; i < response.data.length; i++) {
            tabUser.push(new User(response.data[i].key, response.data[i].username));
        }
        createSelectValue();
        console.log(tabUser);
    })
    .catch(err => console.error(err));

// get tickets
fetch('https://webhelprequest.deta.dev/tickets',)
    .then(response => response.json())
    .then(response => {
        console.log("length", response.data.length);
        console.log(response.data);
        for (i = 0; i < response.data.length; i++) {
            tabTicket.push(new Ticket(response.data[i].key, response.data[i].done, response.data[i].users_id, response.data[i].subject));
        }
        createTabTicket();
        console.log(tabTicket);
    })
    .catch(err => console.error(err));

function next() {

}

function help() {

}

function pass() {

}

/* Post Ticket

const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ done: '0', subject: 'en fait, c\'est bon...', userId: '9ggb9d682hec' })
};

fetch('https://webhelprequest.deta.dev/tickets', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
*/

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
