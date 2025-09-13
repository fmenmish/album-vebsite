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

// --- Cart functions ---
function getCart() {
  const cart = getCookie('cart');
  return cart ? cart.split(',').filter(x => x) : [];
}

function saveCart(cart) {
  setCookie('cart', cart.join(','));
}

function toggleCart(albumId, button) {
  let cart = getCart();
  if (cart.includes(albumId)) {
    // Remove from cart
    cart = cart.filter(id => id !== albumId);
    button.textContent = "Add to Cart";
    button.classList.remove("in-cart");
  } else {
    // Add to cart
    cart.push(albumId);
    button.textContent = "Remove from Cart";
    button.classList.add("in-cart");
  }
  saveCart(cart);
}
