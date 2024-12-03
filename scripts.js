
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cart from localStorage

let isOpen = false; // Track cart open/closed state

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateStickyCart();
    updateCartPanel();
    alert(`${product.name} has been added to your cart.`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateStickyCart();
    updateCartPanel();
}

function toggleCartPanel() {
    const cartPanel = document.getElementById('cartPanel');
    if (isOpen) {
        cartPanel.style.transform = 'translateX(100%)'; // Slide out of view
    } else {
        cartPanel.style.transform = 'translateX(0)'; // Slide into view
    }
    isOpen = !isOpen; // Toggle state
}

function updateStickyCart() {
    const stickyCartCount = document.getElementById('stickyCartCount');
    const stickyCartTotal = document.getElementById('stickyCartTotal');
    if (!stickyCartCount || !stickyCartTotal) return;

    stickyCartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    stickyCartTotal.textContent = cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
}

function updateCartPanel() {
    const cartPanelItems = document.getElementById('cartPanelItems');
    const cartPanelTotal = document.getElementById('cartPanelTotal');
    let total = 0;

    if (!cartPanelItems || !cartPanelTotal) return;

    cartPanelItems.innerHTML = '';
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} (x${item.quantity}) - $${item.price * item.quantity}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartPanelItems.appendChild(li);
    });

    cartPanelTotal.textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    updateStickyCart();
    updateCartPanel();
    const cartPanel = document.getElementById('cartPanel');
    if (cartPanel) {
        cartPanel.style.transform = 'translateX(100%)'; // Ensure initial state is hidden
    }
});
