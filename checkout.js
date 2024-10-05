document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    let total = 0;

    function updateCartDisplay() {
        cartItemsList.innerHTML = ''; // Clear the existing list
        total = 0;

        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Ksh${item.price.toFixed(2)}`;
            
            // Create a "Remove" button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeItem(index);
            });
            
            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
            total += item.price;
        });

        totalPrice.textContent = total.toFixed(2);
    }

    function removeItem(index) {
        cartItems.splice(index, 1); // Remove the item from the array
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
        updateCartDisplay(); // Refresh the cart display
    }

    updateCartDisplay(); // Initial display

    document.getElementById('payment-form').addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get the form values
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('payment').value;

        // Create a message with order details
        const message = `*Order Details:*\n\n` +
                        `Name: ${name}\n` +
                        `Address: ${address}\n` +
                        `Phone: ${phone}\n` +
                        `Total: Ksh${total.toFixed(2)}\n\n` +
                        `Items:\n${cartItems.map(item => `${item.name} - Ksh${item.price.toFixed(2)}`).join('\n')}\n`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp API URL (replace 'your-whatsapp-number' with your actual number)
        const whatsappNumber = '254779624800'; // Include country code, but omit '+' sign
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.location.href = whatsappURL;

        // Clear the cart and redirect to homepage
        localStorage.removeItem('cart'); // Clear cart
    });
});
