const menuData = {
    starters: [
        { name: 'Spring Rolls', price: 5, image: 'images/starter1.jpg' },
        { name: 'Garlic Bread', price: 4, image: 'images/starter2.jpg' },
        { name: 'Stuffed Mushrooms', price: 6, image: 'images/starter3.jpg' },
        { name: 'Bruschetta', price: 7, image: 'images/starter4.jpg' },
        { name: 'Onion Rings', price: 3, image: 'images/starter5.jpg' }
    ],
    pizza: [
        { name: 'Margherita', price: 8, image: 'images/pizza1.jpg' },
        { name: 'Pepperoni', price: 9, image: 'images/pizza2.jpg' },
        { name: 'Hawaiian', price: 10, image: 'images/pizza3.jpg' },
        { name: 'Veggie', price: 9, image: 'images/pizza4.jpg' },
        { name: 'BBQ Chicken', price: 11, image: 'images/pizza5.jpg' }
    ],
    sandwich: [
        { name: 'Cheese Sandwich', price: 6, image: 'images/sandwich1.jpg' },
        { name: 'Chicken Sandwich', price: 7, image: 'images/sandwich2.jpg' },
        { name: 'Turkey Sandwich', price: 8, image: 'images/sandwich3.jpg' },
        { name: 'Ham Sandwich', price: 7, image: 'images/sandwich4.jpg' },
        { name: 'BLT Sandwich', price: 8, image: 'images/sandwich5.jpg' }
    ],
    burger: [
        { name: 'Cheeseburger', price: 10, image: 'images/burger1.jpg' },
        { name: 'Veggie Burger', price: 8, image: 'images/burger2.jpg' },
        { name: 'Bacon Burger', price: 12, image: 'images/burger3.jpg' },
        { name: 'Chicken Burger', price: 11, image: 'images/burger4.jpg' },
        { name: 'Double Cheeseburger', price: 14, image: 'images/burger5.jpg' }
    ]
};

// Function to display menu items based on selected category
function viewCategory(category) {
    const menuContainer = document.querySelector('.menu-items');
    menuContainer.innerHTML = ''; // Clear any previous items

    const items = menuData[category];
    if (items) {
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>$${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
            `;
            menuContainer.appendChild(itemDiv);
        });
    } else {
        menuContainer.innerHTML = '<p>No items available for this category.</p>';
    }
}

// Function to add an item to the cart
function addToCart(name, price, image) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = { name, price, image };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Function to update the cart on the cart page
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = ''; // Clear current cart display

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        totalPriceElement.textContent = '0.00';
    } else {
        let totalPrice = 0;
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <label>Quantity: 
                    <input type="number" value="1" min="1" onchange="updateQuantity('${item.name}', this.value)">
                </label>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartContainer.appendChild(itemDiv);
            totalPrice += item.price;
        });
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

// Function to update total price dynamically based on quantity
function updateQuantity(itemName, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity = parseInt(quantity, 10) || 1;
        item.totalPrice = item.quantity * item.price;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(); // Update the cart display after removal
}

// Call updateCart() on cart page to ensure it loads the cart items correctly
if (window.location.pathname.includes("cart.html")) {
    updateCart();
}
