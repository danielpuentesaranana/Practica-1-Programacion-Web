const token = localStorage.getItem('token');
const socket = io({ auth: { token } });

socket.on('chat message', data => {
  document.getElementById('chat-messages').innerHTML +=
    `<p><strong>${data.user}:</strong> ${data.msg}</p>`;
});

function sendMsg() {
  const msg = document.getElementById('msg').value;
  if (msg) socket.emit('chat message', msg);
  document.getElementById('msg').value = '';
}
