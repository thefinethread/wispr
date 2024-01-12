const socket = io();
const chatForm = document.getElementById('chat-form');
const msgEl = document.getElementById('msg');
const usersEl = document.getElementById('users');
const chatMessages = document.querySelector('.chat-messages');

const query = window.location.search.split('&');
const userId = query[0].replace('?username=', '');
const receiverId = query[1].replace('receiver=', '');

let chats = [];

socket.emit('add-new-user', userId);

socket.on('get-active-users', (activeUsers) => {
  const content = activeUsers
    .filter((user) => user.userId !== userId)
    .map((user) => `<li>${user.userId}</li>`)
    .join('');
  usersEl.innerHTML = content;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (msgEl.value) {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerText = msgEl.value;
    div.style.textAlign = 'end';

    chatMessages.appendChild(div);

    socket.emit('send-message', {
      text: msgEl.value,
      senderId: userId,
      receiverId,
    });
  }

  msgEl.value = '';
});

socket.on('receive-message', (data) => {
  const div = document.createElement('div');
  div.className = 'message';
  div.innerText = data.text;
  chatMessages.appendChild(div);
});
