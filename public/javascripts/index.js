// On Page Load //
document.addEventListener('DOMContentLoaded', function () {
  toggleChat();
})

// Flags //
let showChat = true;

// DOM Getters //
const getUsernameForm = () => document.querySelector('#form');
const getUsername = () => document.querySelector('#username');
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

// Event Listeners //
getUsernameForm().addEventListener('submit', e => {
  e.preventDefault();
  toggleChat();
  getUsername().innerHTML = document.getElementById('handle').value;
  getUsernameForm().style.display = 'none';
})

getMessage().addEventListener('keydown', function () {
  getTyper().innerHTML = '';
  let p = document.createElement('p');
  let em = document.createElement('em');
  em.innerText = getUsername().innerText + " is typing a message...";
  p.appendChild(em);
  getTyper().appendChild(p);
  getChatWindow().scrollTop = getChatWindow().scrollHeight;
})

getMessageForm().addEventListener('submit', function (e) {
  e.preventDefault();
  // submit message
  getTyper().innerHTML = ""

  let p = document.createElement('p');
  let strong = document.createElement('strong');
  strong.innerText = getUsername().innerText;
  p.appendChild(strong);
  p.insertAdjacentText("beforeend", ": " + getMessage().value);
  getOutput().appendChild(p);
  getChatWindow().scrollTop = getChatWindow().scrollHeight;
  // erase message window
  getMessage().value = ""
})