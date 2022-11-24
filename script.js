const selectUser = document.getElementById('selectUser');

// Definition des classes d'objets
class Ticket {
    constructor(key= 0, done = 0, users_id = 0, subject = ""){
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

function createSelectValue(){
    console.log("tab",tabUser);
    for(i=0; i<tabUser.length; i++){
        const option = document.createElement("option");
        option.value = i+1
        option.innerHTML = tabUser[i].username;
        selectUser.appendChild(option);
    }
}

// get users
fetch('https://webhelprequest.deta.dev/users',)
    .then(response => response.json())
    .then(response => {
        console.log("length", response.data.length);
        console.log(response.data);
        for(i=0;i<response.data.length;i++){
            tabUser.push(new User(response.data[i].key,response.data[i].username));
        }
        createSelectValue();
        console.log(tabUser)
    })
    .catch(err => console.error(err));

// get tickets
fetch('https://webhelprequest.deta.dev/tickets',)
    .then(response => response.json())
    .then(response => {
        console.log("length", response.data.length);
        console.log(response.data);
        for(i=0;i<response.data.length;i++){
            tabTicket.push(new Ticket(response.data[i].key,response.data[i].done,response.data[i].users_id,response.data[i].subject));
        }
        console.log(tabTicket);
    })
    .catch(err => console.error(err));




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
