let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Example products (can be dynamically generated from a database)
const products = [
    { name: 'Sexy Woman heels', price: 3099.00, image: 'pics/a1' },
    { name: 'Stylish Summer heels', price: 2599.00, image: 'pics/a2.jpg' },
    { name: 'Stylish heels', price: 2999.00, image: 'pics/a3.jpg' },

    { name: 'Stylish Sneakers', price: 1599.00, image: 'pics/1.jpg' },
    { name: 'Louis Vuitton X Nike', price: 1100.00, image: 'pics/2.jpg' },
    { name: 'Stylish White Sneakers', price: 1700.00, image: 'pics/3.jpg' },
    { name: 'Casual Sneaker', price: 2800.00, image: 'pics/4.jpg' },
    { name: 'Wool Sneaker', price: 2900.00, image: 'pics/5.jpg' },
    { name: 'Red Tape Casual Sneaker', price: 1500.00, image: 'pics/6.jpg' },
    { name: 'Campus Casual Shoes', price: 1200.00, image: 'pics/7.jpg' },
    { name: 'Trainers Run Of', price: 1300.00, image: 'pics/8.jpg' },
    { name: 'Fuego White low-top Sneaker', price: 1600.00, image: 'pics/9.jpg' },
    { name: 'Air Jordan shoes', price: 1800.00, image: 'pics/a.jpg' },
    { name: 'Air Jordan 9 Retro', price: 1500.00, image: 'pics/s.jpg' },
    { name: 'Jordan 1 High Top', price: 2500.00, image: 'pics/u.jpg' },
    // Add more products here
];

// Dynamically add products to the page
const shopSection = document.getElementById('shop');
products.forEach((product, index) => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Ksh${product.price.toFixed(2)}</p>
        <input type="number" id="quantity-${index}" min="1" value="1" />
        <button onclick="addToCart('${product.name}', ${product.price}, ${index})">Add to Cart</button>
    `;
    shopSection.appendChild(div);
});

function addToCart(productName, price, index) {
    const quantity = document.getElementById(`quantity-${index}`).value || 1;
    for (let i = 0; i < quantity; i++) {
        cart.push({ name: productName, price: price });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - Ksh${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function checkout() {
    window.location.href = 'checkout.html';
}

// Initial cart update
updateCart();

// Image enlargement functionality
document.querySelectorAll('.product img').forEach(image => {
    image.addEventListener('click', () => {
        if (image.classList.contains('enlarge')) {
            image.classList.remove('enlarge');
        } else {
            document.querySelectorAll('.product img').forEach(img => img.classList.remove('enlarge'));
            image.classList.add('enlarge');
        }
    });
});


// Form focus and blur effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#contactME textarea').forEach(textarea => {
        textarea.addEventListener('blur', () => {
            if (textarea.value !== '') {
                textarea.classList.add('focused');
            } else {
                textarea.classList.remove('focused');
            }
        });
    });

    document.querySelectorAll('#contactME .field input[type="text"]').forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value !== '') {
                input.classList.add('focused');
            } else {
                input.classList.remove('focused');
            }
        });
    });

    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for contacting us. We will get back to you soon!');
        document.getElementById('contact-form').reset();
    });
});


let interactionCount = 0;
const adShownKey = 'adShown';
const adShowInterval = 30000; // 30 seconds
const interactionThreshold = 25; // Show ad after every 5 interactions
let popupInterval;

function showPopup() {
    document.getElementById('popup-ad').style.display = 'block';
    startCountdown();
    startPopupInterval();
}

function closePopup() {
    document.getElementById('popup-ad').style.display = 'none';
    interactionCount++; // Increase interaction count when the popup is closed
    // Check if the ad should be shown again after interactions
    if (interactionCount % interactionThreshold === 0) {
        showPopup();
    }
}

function startCountdown() {
    const countdownDuration = 60; // 60 seconds
    let remainingTime = countdownDuration;

    const timer = setInterval(() => {
        remainingTime--;
        document.getElementById('time').textContent = formatTime(remainingTime);

        if (remainingTime <= 0) {
            clearInterval(timer);
            closePopup();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startPopupInterval() {
    // Clear any existing timeout to avoid multiple popups being scheduled
    clearTimeout(popupInterval);
    popupInterval = setTimeout(() => {
        if (document.getElementById('popup-ad').style.display === 'none') {
            showPopup(); // Show again after the interval
        }
    }, adShowInterval);
}

function checkAdDisplay() {
    const lastShown = localStorage.getItem(adShownKey);
    const now = Date.now();

    // Show ad if it hasn't been shown or if the interval has passed
    if (!lastShown || (now - lastShown) > adShowInterval) {
        showPopup();
        localStorage.setItem(adShownKey, now); // Update last shown time
    }
}

// Call checkAdDisplay when the page loads
window.onload = checkAdDisplay;

// Event listener for general user interactions (clicks)
document.addEventListener('click', () => {
    interactionCount++;
    if (interactionCount % interactionThreshold === 0) {
        showPopup();
    }
});
