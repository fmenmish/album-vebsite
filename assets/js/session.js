// --- Cookie helpers ---
function setCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
}
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// --- Auth helpers ---
function isLoggedIn() {
  return getCookie('loggedIn') === 'true';
}

function logout() {
  deleteCookie('membership');
  deleteCookie('email');
  deleteCookie('loggedIn');
  window.location.href = "index.html"; // redirect to homepage
}

function renderUserControls() {
  const container = document.getElementById('user-controls');
  if (!container) return;

  container.innerHTML = '';

  if (isLoggedIn()) {
    container.innerHTML = `
      <span class="logged-in">✔ Logged in</span>
      <a href="cart.html" class="cart-link">🛒 Cart</a>
      <button id="logoutBtn" class="logout-button">🚪 Logout</button>
    `;

    document.getElementById("logoutBtn").addEventListener("click", logout);
  } else {
    window.location.pathname === '/album-vebsite/' ? 
     container.innerHTML = `
      <a href="login.html" class="login-button">🔑 Login</a>
    `
    : container.innerHTML = `
    <a href="../login.html" class="login-button">🔑 Login</a>
  `
    ;
  }
}

document.addEventListener('DOMContentLoaded', renderUserControls);
