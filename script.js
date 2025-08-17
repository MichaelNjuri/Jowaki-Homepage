// Uhuru Threads - Modern Kenyan Fashion Store
// Interactive JavaScript with Gen Z features

// Global State Management
const state = {
    cart: [],
    cartTotal: 0,
    isCartOpen: false,
    currentFilter: 'all',
    products: [],
    isLoading: false
};

// Sample Products Data (Kenyan Fashion Inspired)
const productsData = [
    {
        id: 1,
        name: "Maasai Sunset Dress",
        description: "Contemporary dress inspired by traditional Maasai patterns",
        price: 4500,
        category: "traditional",
        tags: ["new", "trending"],
        image: "👗",
        colors: ["red", "orange", "gold"]
    },
    {
        id: 2,
        name: "Nairobi Street Jacket",
        description: "Urban-inspired jacket with Kenyan flag accents",
        price: 6800,
        category: "contemporary",
        tags: ["trending"],
        image: "🧥",
        colors: ["black", "red", "green"]
    },
    {
        id: 3,
        name: "Beaded Heritage Necklace",
        description: "Handcrafted beaded necklace by local artisans",
        price: 2300,
        category: "accessories",
        tags: ["new"],
        image: "📿",
        colors: ["multicolor"]
    },
    {
        id: 4,
        name: "Kikoy Print Shirt",
        description: "Modern shirt featuring traditional Kikoy patterns",
        price: 3200,
        category: "traditional",
        tags: ["sale"],
        image: "👕",
        colors: ["blue", "white"]
    },
    {
        id: 5,
        name: "Safari Chic Boots",
        description: "Leather boots perfect for urban adventures",
        price: 7500,
        category: "footwear",
        tags: ["new", "trending"],
        image: "👢",
        colors: ["brown", "tan"]
    },
    {
        id: 6,
        name: "Ankara Fusion Skirt",
        description: "Vibrant Ankara print in contemporary silhouette",
        price: 3800,
        category: "contemporary",
        tags: ["trending"],
        image: "👗",
        colors: ["yellow", "blue", "red"]
    },
    {
        id: 7,
        name: "Maasai Warrior Bracelet",
        description: "Bold bracelet inspired by Maasai warrior traditions",
        price: 1800,
        category: "accessories",
        tags: ["new"],
        image: "⌚",
        colors: ["red", "black"]
    },
    {
        id: 8,
        name: "Kenyan Cotton Polo",
        description: "Premium cotton polo with subtle Kenyan motifs",
        price: 2900,
        category: "contemporary",
        tags: ["sale"],
        image: "👔",
        colors: ["white", "navy", "green"]
    }
];

// DOM Elements
const elements = {
    navbar: document.getElementById('navbar'),
    hamburger: document.getElementById('hamburger'),
    navMenu: document.getElementById('nav-menu'),
    cartIcon: document.querySelector('.cart-icon'),
    cartCount: document.querySelector('.cart-count'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartOverlay: document.getElementById('cart-overlay'),
    closeCart: document.getElementById('close-cart'),
    cartItems: document.getElementById('cart-items'),
    cartTotal: document.getElementById('cart-total'),
    productsGrid: document.getElementById('products-grid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    loadMoreBtn: document.getElementById('load-more-btn'),
    subscribeBtn: document.getElementById('subscribe-btn'),
    emailInput: document.getElementById('email-input')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    state.products = [...productsData];
    setupEventListeners();
    renderProducts();
    setupScrollAnimations();
    setupNavbarScroll();
    updateCartUI();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    elements.hamburger?.addEventListener('click', toggleMobileMenu);
    
    // Cart functionality
    elements.cartIcon?.addEventListener('click', toggleCart);
    elements.closeCart?.addEventListener('click', closeCart);
    elements.cartOverlay?.addEventListener('click', closeCart);
    
    // Product filtering
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Load more products
    elements.loadMoreBtn?.addEventListener('click', loadMoreProducts);
    
    // Newsletter subscription
    elements.subscribeBtn?.addEventListener('click', handleSubscription);
    elements.emailInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSubscription();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Category cards click
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });
    
    // Close cart with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isCartOpen) {
            closeCart();
        }
    });
}

// Navigation Functions
function toggleMobileMenu() {
    elements.navMenu?.classList.toggle('open');
    elements.hamburger?.classList.toggle('active');
}

function setupNavbarScroll() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            elements.navbar?.classList.add('scrolled');
        } else {
            elements.navbar?.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            elements.navbar?.style.transform = 'translateY(-100%)';
        } else {
            elements.navbar?.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    elements.navMenu?.classList.remove('open');
    elements.hamburger?.classList.remove('active');
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Product Functions
function renderProducts(productsToRender = state.products.slice(0, 6)) {
    if (!elements.productsGrid) return;
    
    elements.productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card fade-in" data-product-id="${product.id}">
            <div class="product-image">
                <div class="product-image-icon">${product.image}</div>
                ${product.tags.includes('new') ? '<div class="product-badge">New</div>' : ''}
                ${product.tags.includes('sale') ? '<div class="product-badge" style="background: var(--primary-red);">Sale</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-colors">
                    ${product.colors.map(color => `<span class="color-dot" style="background: ${getColorValue(color)}"></span>`).join('')}
                </div>
                <div class="product-price">
                    <span class="price">KSh ${product.price.toLocaleString()}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Trigger scroll animations for new products
    setTimeout(() => {
        setupScrollAnimations();
    }, 100);
}

function getColorValue(color) {
    const colorMap = {
        red: '#dc2626',
        orange: '#ea580c',
        gold: '#f59e0b',
        black: '#1f2937',
        green: '#059669',
        blue: '#2563eb',
        white: '#ffffff',
        navy: '#1e40af',
        brown: '#92400e',
        tan: '#d97706',
        yellow: '#eab308',
        multicolor: 'linear-gradient(45deg, #dc2626, #f59e0b, #059669, #2563eb)'
    };
    return colorMap[color] || color;
}

function handleFilterClick(e) {
    const filter = e.target.dataset.filter;
    state.currentFilter = filter;
    
    // Update active filter button
    elements.filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter and render products
    const filteredProducts = filterProducts(filter);
    renderProducts(filteredProducts.slice(0, 6));
    
    // Show/hide load more button
    if (filteredProducts.length > 6) {
        elements.loadMoreBtn?.style.display = 'block';
    } else {
        elements.loadMoreBtn?.style.display = 'none';
    }
}

function filterProducts(filter) {
    if (filter === 'all') return state.products;
    return state.products.filter(product => 
        product.category === filter || product.tags.includes(filter)
    );
}

function loadMoreProducts() {
    const filteredProducts = filterProducts(state.currentFilter);
    const currentlyShown = elements.productsGrid?.children.length || 0;
    const nextBatch = filteredProducts.slice(currentlyShown, currentlyShown + 6);
    
    if (nextBatch.length > 0) {
        const newProductsHTML = nextBatch.map(product => `
            <div class="product-card fade-in" data-product-id="${product.id}">
                <div class="product-image">
                    <div class="product-image-icon">${product.image}</div>
                    ${product.tags.includes('new') ? '<div class="product-badge">New</div>' : ''}
                    ${product.tags.includes('sale') ? '<div class="product-badge" style="background: var(--primary-red);">Sale</div>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-colors">
                        ${product.colors.map(color => `<span class="color-dot" style="background: ${getColorValue(color)}"></span>`).join('')}
                    </div>
                    <div class="product-price">
                        <span class="price">KSh ${product.price.toLocaleString()}</span>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-bag"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        elements.productsGrid.innerHTML += newProductsHTML;
        
        // Hide load more button if no more products
        if (currentlyShown + nextBatch.length >= filteredProducts.length) {
            elements.loadMoreBtn.style.display = 'none';
        }
        
        // Trigger animations
        setTimeout(() => {
            setupScrollAnimations();
        }, 100);
    }
}

function handleCategoryClick(e) {
    const category = e.currentTarget.dataset.category;
    if (category) {
        // Scroll to collections section
        scrollToSection('collections');
        
        // Filter products by category after a short delay
        setTimeout(() => {
            const filterBtn = document.querySelector(`[data-filter="${category}"]`);
            if (filterBtn) {
                filterBtn.click();
            }
        }, 800);
    }
}

// Cart Functions
function toggleCart() {
    if (state.isCartOpen) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    state.isCartOpen = true;
    elements.cartSidebar?.classList.add('open');
    elements.cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    state.isCartOpen = false;
    elements.cartSidebar?.classList.remove('open');
    elements.cartOverlay?.classList.remove('open');
    document.body.style.overflow = '';
}

function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartNotification(product.name);
    
    // Add animation to cart icon
    elements.cartIcon?.classList.add('bounce');
    setTimeout(() => {
        elements.cartIcon?.classList.remove('bounce');
    }, 600);
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartQuantity(productId, newQuantity) {
    const item = state.cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (elements.cartCount) {
        elements.cartCount.textContent = totalItems;
        elements.cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
    
    // Update cart total
    state.cartTotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (elements.cartTotal) {
        elements.cartTotal.textContent = state.cartTotal.toLocaleString();
    }
    
    // Update cart items
    renderCartItems();
}

function renderCartItems() {
    if (!elements.cartItems) return;
    
    if (state.cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; color: var(--medium-gray); margin-bottom: 1rem;"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" onclick="closeCart()">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    elements.cartItems.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">KSh ${item.price.toLocaleString()}</p>
                <div class="quantity-controls">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Newsletter Functions
function handleSubscription() {
    const email = elements.emailInput?.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate subscription process
    elements.subscribeBtn.innerHTML = '<div class="loading"></div>';
    elements.subscribeBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for subscribing! 🎉', 'success');
        elements.emailInput.value = '';
        elements.subscribeBtn.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
        elements.subscribeBtn.disabled = false;
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Animation Functions
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animation elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to elements
    document.querySelectorAll('.category-card, .product-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedResize = debounce(() => {
    // Handle resize events
    setupScrollAnimations();
}, 250);

window.addEventListener('resize', debouncedResize);

// Add some CSS for additional animations and notifications
const additionalStyles = `
    .cart-notification {
        position: fixed;
        top: 100px;
        right: -300px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1002;
        transition: var(--transition-normal);
    }
    
    .cart-notification.show {
        right: 20px;
    }
    
    .notification {
        position: fixed;
        top: -100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        border-radius: var(--radius-lg);
        color: white;
        font-weight: 600;
        z-index: 1002;
        transition: var(--transition-normal);
    }
    
    .notification.show {
        top: 100px;
    }
    
    .notification.success {
        background: var(--primary-green);
    }
    
    .notification.error {
        background: var(--primary-red);
    }
    
    .notification.info {
        background: var(--electric-blue);
    }
    
    .bounce {
        animation: bounce 0.6s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    .cart-item {
        display: flex;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--light-gray);
    }
    
    .cart-item-image {
        font-size: 2rem;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--light-gray);
        border-radius: var(--radius-md);
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .cart-item-details h4 {
        font-size: 1rem;
        margin-bottom: 0.25rem;
    }
    
    .cart-item-price {
        color: var(--primary-red);
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quantity-controls button {
        width: 30px;
        height: 30px;
        border: 1px solid var(--medium-gray);
        background: white;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: var(--transition-fast);
    }
    
    .quantity-controls button:hover {
        background: var(--light-gray);
    }
    
    .remove-item {
        background: none;
        border: none;
        color: var(--medium-gray);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: var(--radius-sm);
        transition: var(--transition-fast);
    }
    
    .remove-item:hover {
        color: var(--primary-red);
        background: var(--light-gray);
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem;
        color: var(--medium-gray);
    }
    
    .product-colors {
        display: flex;
        gap: 0.25rem;
        margin-bottom: 0.5rem;
    }
    
    .color-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 1px var(--light-gray);
    }
    
    .product-image-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        opacity: 0.7;
        z-index: 1;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.scrollToSection = scrollToSection;

console.log('🇰🇪 Uhuru Threads - Modern Kenyan Fashion Store Loaded! 🎉');