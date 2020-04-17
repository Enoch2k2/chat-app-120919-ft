// make a socket connection to our server
const socket = io.connect('http://localhost:3000');

// On Page Load //
document.addEventListener('DOMContentLoaded', function () {
  toggleChat();
})

// Flags //
let showChat = true;

// DOM Getters //
const getUsernameForm = () => document.querySelector('#form');
const getUsername = () => document.querySelector('#username');
const getUsers = () => document.getElementById('users');
const getMessage = () => document.querySelector('#message');
const getTyper = () => document.querySelector('#typer');
const getChatWindow = () => document.getElementById('Chat-Window');
const getMessageForm = () => document.getElementById('message-form');
const getOutput = () => document.getElementById('output');

// Helpers //
function toggleChat() {
  const div = document.querySelector('#Chat-App');

  if (showChat) {
    div.style.display = 'none';
    showChat = false;
  } else {
    div.style.display = 'block';
    showChat = true;
  }
}

function refreshUsers(users) {
  getUsers().innerHTML = '';
  users.forEach(user => {
    let li = document.createElement('li');
    li.innerText = user.username;
    getUsers().appendChild(li);
  })
}

// Event Listeners //
getUsernameForm().addEventListener('submit', e => {
  e.preventDefault();
  toggleChat();
  getUsername().innerHTML = document.getElementById('handle').value;
  socket.emit('login', { username: getUsername().innerText });
  getUsernameForm().style.display = 'none';
})

getMessage().addEventListener('keydown', function () {
  socket.emit('typing', { username: getUsername().innerText });
})

getMessageForm().addEventListener('submit', function (e) {
  e.preventDefault();
  // submit message

  socket.emit('message', { username: getUsername().innerText, message: getMessage().value })

  getMessage().value = ""
})

socket.on('login', function (data) {
  let p = document.createElement('p');
  let strong = document.createElement('strong');
  strong.innerText = `${data.user.username} has logged in`;
  p.appendChild(strong);
  getOutput().appendChild(p);
  getChatWindow().scrollTop = getChatWindow().scrollHeight;
  refreshUsers(data.users);
})

socket.on('message', function (data) {
  getTyper().innerHTML = ""
  let p = document.createElement('p');
  let strong = document.createElement('strong');
  strong.innerText = data.username;
  p.appendChild(strong);
  p.insertAdjacentText("beforeend", ": " + data.message);
  getOutput().appendChild(p);
  getChatWindow().scrollTop = getChatWindow().scrollHeight;
  // erase message window
})

socket.on('typing', function (data) {
  getTyper().innerHTML = '';
  let p = document.createElement('p');
  let em = document.createElement('em');
  em.innerText = data.username + " is typing a message...";
  p.appendChild(em);
  getTyper().appendChild(p);
  getChatWindow().scrollTop = getChatWindow().scrollHeight;
})

socket.on('logout', function (data) {
  let p = document.createElement('p');
  let strong = document.createElement('strong');
  strong.innerText = `${data.user.username} has logged off`;
  p.appendChild(strong);
  getOutput().appendChild(p);
  getChatWindow().scrollTop = getChatWindow().scrollHeight;
  refreshUsers(data.users);
})