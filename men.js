// Men's Section JavaScript

// Shopping cart functionality
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    showAllProducts();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

// Add item to cart
function addToCart(id, price, name) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    cartCount++;
    cartTotal += price;
    updateCartDisplay();
    
    // Show success animation
    showAddToCartSuccess(name);
}

// Remove item from cart
function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        cartTotal -= (item.price * item.quantity);
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        updateCartModal();
    }
}

// Update cart display
function updateCartDisplay() {
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toLocaleString();
}
// Show add to cart success message
function showAddToCartSuccess(itemName) {
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #2d3436, #636e72);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            z-index: 3000;
            box-shadow: 0 10px 25px rgba(45, 52, 54, 0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        ">
            <strong>✓ Added to Cart!</strong><br>
            <small>${itemName}</small>
        </div>
    `;
    
    document.body.appendChild(successMsg);
    const msgElement = successMsg.firstElementChild;
    
    // Animate in
    setTimeout(() => {
        msgElement.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        msgElement.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 300);
    }, 3000);
}

// Show cart modal
function showCart() {
    updateCartModal();
    document.getElementById('cart-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Update cart modal content
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>Your cart is empty</p>
                <small>Add some stylish men's items to get started!</small>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()} × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                Remove
            </button>
        </div>
    `).join('');
}

// Show products by category
function showCategory(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            product.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Update active category indicator
    updateCategoryButtons(category);
    
    // Scroll to products section
    document.getElementById('featured').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Show all products
function showAllProducts() {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.display = 'block';
        product.style.animation = 'fadeInUp 0.5s ease forwards';
    });
}

// Update category button styles
function updateCategoryButtons(activeCategory) {
    // This function can be expanded to highlight active category buttons
    console.log(`Active category: ${activeCategory}`);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add some items before checkout.');
        return;
    }
    
    // Create checkout summary
    let summary = 'Men\'s Fashion Order Summary:\n\n';
    cart.forEach(item => {
        summary += `${item.name} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}\n`;
    });
    summary += `\nTotal: ₹${cartTotal.toLocaleString()}`;
    summary += '\n\nThank you for shopping SOUTHSIDE Men\'s! 👔';
    
    alert(summary);
    
    // Clear cart after checkout
    cart = [];
    cartCount = 0;
    cartTotal = 0;
    updateCartDisplay();
    closeCart();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        closeCart();
    }
}

// Keyboard navigation for modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCart();
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card {
        animation: none;
    }
    
    .cart-item {
        animation: slideIn 0.3s ease forwards;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Sophisticated hover effects for men's fashion
function addHoverEffect(element) {
    const effect = document.createElement('div');
    effect.innerHTML = '⚡';
    effect.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: 1.2rem;
        animation: hoverEffect 0.8s ease forwards;
        z-index: 1000;
        color: #2d3436;
    `;
    
    const rect = element.getBoundingClientRect();
    effect.style.left = (rect.left + Math.random() * rect.width) + 'px';
    effect.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 800);
}

// Add hover effect animation CSS
const hoverStyle = document.createElement('style');
hoverStyle.textContent = `
    @keyframes hoverEffect {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(hoverStyle);

// Add hover effects to product cards on hover
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            addHoverEffect(card);
        });
    });
});

// Search functionality
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Size guide functionality
function showSizeGuide() {
    document.getElementById('size-guide').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Newsletter signup
function subscribeNewsletter(email) {
    if (email && email.includes('@')) {
        alert(`Thank you for subscribing to SOUTHSIDE Men's newsletter! 👔\nWe'll send men's fashion updates to ${email}`);
        return true;
    } else {
        alert('Please enter a valid email address.');
        return false;
    }
}

// Social sharing functions
function shareOnSocial(platform, productName) {
    const url = window.location.href;
    const text = `Check out this stylish ${productName} from SOUTHSIDE Men's!`;
    
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
});

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
}
