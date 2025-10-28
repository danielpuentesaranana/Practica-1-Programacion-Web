let token = '';

async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch('/api/auth/login', {
    method: 'POST', headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem('token', token);
    document.getElementById('auth').style.display = 'none';
    document.getElementById('menu').style.display = '';
    loadProductos();
    alert('Bienvenido ' + data.username + ' (' + data.role + ')');
  } else {
    alert(data.message || "Error");
  }
}

async function register() {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;
  const res = await fetch('/api/auth/register', {
    method: 'POST', headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role })
  });
  const data = await res.json();
  alert(data.message);
}

async function loadProductos() {
  const res = await fetch('/api/products');
  const products = await res.json();
  const div = document.getElementById('productos');
  div.innerHTML = '';
  products.forEach(prod => {
    div.innerHTML += `<div class="producto"><h3>${prod.name}</h3>
      <p>${prod.description}</p>
      <p>Precio: ${prod.price} €</p></div>`;
  });
}

function logout() {
  token = '';
  localStorage.removeItem('token');
  document.getElementById('auth').style.display = '';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('productos').innerHTML = '';
}
