// ===== SHOPPING CART SYSTEM =====
// This file manages a shopping cart that saves items to the browser's localStorage
// localStorage is like a small database in the browser that remembers data even after closing
//
// Key concepts:
// - cart array: stores all items user has added
// - localStorage: browser's built-in storage that persists across page reloads
// - JSON.stringify/parse: converts between JavaScript objects and text for storage

// ===== INITIALIZE CART FROM BROWSER STORAGE =====
// When the page loads, this line runs first
// It checks if there's a saved cart in localStorage
// If yes, it loads the saved items; if no, it starts with an empty array []

// localStorage.getItem('cart') retrieves data stored under the key 'cart'
// JSON.parse converts the stored text back into a JavaScript array we can work with
// Example: stored text '{"id":1,"name":"M3","price":89900}' becomes a real JavaScript object
// || [] is the "fallback": if nothing is stored, use an empty array instead
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price, productId) {
    console.log('addToCart called →', productName, price, productId);
    
    const buttons = document.querySelectorAll(`button[onclick*="${productId}"]`);
    let clickedButton = null;
    buttons.forEach(btn => {
        if (btn.textContent.includes('Add to Cart')) {
            clickedButton = btn;
        }
    });
    
    if (clickedButton) {
        clickedButton.disabled = true;
        clickedButton.style.opacity = '0.6';
        clickedButton.textContent = 'Adding...';
    }
    
    setTimeout(() => {
        // Map product IDs to images
        const imageMap = {
            1: 'images/m3.jpg',
            2: 'images/m4.jpg',
            3: 'images/m5.jpg',
            4: 'images/m2.jpg',
            5: 'images/m8.jpg',
            6: 'images/x5m.jpg'
        };
        
        const product = {
            id: productId,
            name: productName,
            price: price,
            quantity: 1,
            image: imageMap[productId] || 'images/m3.jpg'
        };
        
        const existingProduct = cart.find(item => item.id === productId);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        showToast(`✓ ${productName} added! (${totalItems} in cart)`);
        updateCartCount();
        
        if (clickedButton) {
            clickedButton.disabled = false;
            clickedButton.style.opacity = '1';
            clickedButton.textContent = 'Add to Cart';
        }
    }, 400);
}

// ===== FUNCTION TO REMOVE ITEM FROM CART =====
function removeFromCart(productId) {
    // Find the index (position) of the item in the cart array
    const index = cart.findIndex(item => item.id === productId);
    
    // If item was found (index is not -1)
    if (index > -1) {
        // Remove the item from the cart array
        // splice(index, 1) removes 1 item at the specified index
        cart.splice(index, 1);
    }
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Refresh the cart display on the page
    displayCart();
    
    // Update the cart count
    updateCartCount();
}

// ===== FUNCTION TO CHANGE QUANTITY OF AN ITEM =====
function updateQuantity(productId, newQuantity) {
    // Find the product in the cart with this ID
    const product = cart.find(item => item.id === productId);
    
    // If product exists
    if (product) {
        // If new quantity is 0 or less, remove the product entirely
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            // Otherwise, update the quantity to the new value
            product.quantity = newQuantity;
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Refresh the display
            displayCart();
            
            // Update cart count
            updateCartCount();
        }
    }
}

// ===== FUNCTION TO CALCULATE TOTAL PRICE =====
function calculateTotal() {
    // Start with 0
    // For each item in the cart, multiply price by quantity
    // Add to the running total
    // reduce() goes through each item and accumulates a result
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ===== FUNCTION TO DISPLAY CART ON THE PAGE =====
function displayCart() {
    // Get the HTML element where we want to show the cart
    const cartContainer = document.getElementById('cart-items');
    
    // If the cart is empty
    if (cart.length === 0) {
        // Show an empty message
        cartContainer.innerHTML = '<p>Cart is empty.</p>'; // "Cart is empty" in Estonian
        return; // Stop the function here
    }
    
    // Start building the HTML for the cart
    let html = '';
    
    // Loop through each item in the cart
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i]; // Get the current item
        
        // Create HTML for this item
        html += `
            <div class="cart-item">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Price: €${item.price}</p>
                </div>
                
                <div class="item-quantity">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <input type="number" value="${item.quantity}" 
                           onchange="updateQuantity(${item.id}, this.value)" 
                           min="1">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                
                <div class="item-total">
                    <p>Total: €${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }
    
    // Put all the HTML into the page
    cartContainer.innerHTML = html;
    
    // Display the total price
    const total = calculateTotal();
    document.getElementById('cart-total').innerHTML = `
        <h2>Total: €${total.toFixed(2)}</h2>
        <button class="btn-checkout">Pay</button>
        <button class="btn-continue" onclick="location.href='esileht.html'">Continue shopping</button>
    `;
}

// ===== FUNCTION TO UPDATE CART COUNT BADGE =====
function updateCartCount() {
    // Find the element that shows how many items are in the cart
    const cartBadge = document.getElementById('cart-count');
    
    // If the element exists
    if (cartBadge) {
        // Count total items in cart (sum of all quantities)
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Display the count
        cartBadge.textContent = totalItems;
        
        // Show the badge only if there are items
        cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// ===== FUNCTION TO CLEAR ENTIRE CART =====
function clearCart() {
    // Ask user for confirmation (prevent accidental deletion)
    if (confirm('Are you sure? All products will be removed from the cart.')) {
        // Reset cart to empty array
        cart = [];
        // Remove from localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Refresh the display
        displayCart();
        
        // Update cart count
        updateCartCount();
    } else {
            // User cancelled, do nothing
            console.log('Cart clear cancelled by user');
        }
    }
// ===== RUN THESE FUNCTIONS WHEN PAGE LOADS =====
window.addEventListener('DOMContentLoaded', function() {
    // Display the cart when the page first loads
    displayCart();
    
    // Update the cart count badge
    updateCartCount();
});

// ===== TOAST NOTIFICATION HELPER =====
// Shows a small non-blocking message at the bottom-right of the page
function showToast(message, duration = 2500) {
    let toast = document.getElementById('toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.position = 'fixed';
        toast.style.right = '24px';
        toast.style.bottom = '24px';
        toast.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
        toast.style.color = '#fff';
        toast.style.padding = '16px 24px';
        toast.style.borderRadius = '12px';
        toast.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.4)';
        toast.style.zIndex = '9999';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        toast.style.fontWeight = '600';
        toast.style.fontSize = '14px';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '12px';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="white" stroke-width="2"/>
            <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>${message}</span>
    `;
    
    toast.style.display = 'flex';
    toast.offsetWidth;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, duration);
}