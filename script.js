// Definition des classes d'objets
class Ticket {
    constructor(key= 0, done = 0, user_id = 0, subject = ""){
        this.key = key; 
        this.done = done;
        this.user_id = user_id;
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

// get users
fetch('https://webhelprequest.deta.dev/users',)
    .then(response => response.json())
    .then(response => {
        console.log("length", response.data.length);
        console.log(response.data);
        for(i=0;i<response.data.length;i++){
            tabUser.push(new User(response.data[i].key,response.data[i].username));
        }
        console.log(tabUser)
    })
    .catch(err => console.error(err));

// get tickets



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
