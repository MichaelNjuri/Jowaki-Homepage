// Shop Page JavaScript for OddFynds
class ShopPage {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('oddFyndsCart')) || [];
        this.products = this.generateAllProducts();
        this.filteredProducts = [...this.products];
        this.currentCategory = 'all';
        this.productsPerPage = 12;
        this.currentPage = 1;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartUI();
        this.setupFilters();
    }

    generateAllProducts() {
        return [
            {
                id: 1,
                name: "Vintage Denim Jacket",
                description: "90s oversized denim jacket with unique distressing and patches",
                price: 35,
                category: "outerwear",
                size: "M-L",
                condition: "Excellent",
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
                tags: ["new", "trending", "vintage"],
                colors: ["blue", "indigo"]
            },
            {
                id: 2,
                name: "Y2K Butterfly Top",
                description: "Mesh butterfly print top perfect for layering or statement piece",
                price: 22,
                category: "tops",
                size: "S",
                condition: "Very Good",
                image: "https://images.unsplash.com/photo-1564584217132-2271339c0c1d?w=400&h=400&fit=crop&crop=center",
                tags: ["trending", "y2k"],
                colors: ["black", "purple"]
            },
            {
                id: 3,
                name: "Chunky Gold Chain",
                description: "Statement gold-toned chain necklace with vintage appeal",
                price: 18,
                category: "accessories",
                size: "One Size",
                condition: "Excellent",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
                tags: ["new", "accessories"],
                colors: ["gold"]
            },
            {
                id: 4,
                name: "High-Waisted Mom Jeans",
                description: "Classic 90s mom jeans with perfect vintage wash and fit",
                price: 28,
                category: "bottoms",
                size: "28W",
                condition: "Very Good",
                image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop&crop=center",
                tags: ["sale", "vintage"],
                colors: ["blue", "light-blue"]
            },
            {
                id: 5,
                name: "Vintage Band Tee",
                description: "Authentic vintage concert tee with soft worn-in feel",
                price: 25,
                category: "tops",
                size: "M",
                condition: "Good",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
                tags: ["new", "trending", "band"],
                colors: ["black", "gray"]
            },
            {
                id: 6,
                name: "Plaid Mini Skirt",
                description: "90s grunge plaid mini skirt perfect for styling",
                price: 20,
                category: "bottoms",
                size: "S",
                condition: "Excellent",
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center",
                tags: ["trending", "grunge"],
                colors: ["red", "black", "white"]
            },
            {
                id: 7,
                name: "Vintage Leather Bag",
                description: "Genuine leather crossbody bag with vintage charm",
                price: 32,
                category: "accessories",
                size: "One Size",
                condition: "Very Good",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
                tags: ["new", "leather"],
                colors: ["brown", "tan"]
            },
            {
                id: 8,
                name: "Oversized Blazer",
                description: "80s power blazer with shoulder pads, perfect for styling",
                price: 30,
                category: "outerwear",
                size: "L",
                condition: "Excellent",
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center",
                tags: ["sale", "80s"],
                colors: ["black", "gray"]
            },
            {
                id: 9,
                name: "Vintage Sunglasses",
                description: "Retro cat-eye sunglasses with tinted lenses",
                price: 15,
                category: "accessories",
                size: "One Size",
                condition: "Excellent",
                image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
                tags: ["trending", "retro"],
                colors: ["black", "gold"]
            },
            {
                id: 10,
                name: "Cropped Cardigan",
                description: "Soft knit cropped cardigan, perfect for layering",
                price: 24,
                category: "tops",
                size: "S-M",
                condition: "Very Good",
                image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center",
                tags: ["new", "cozy"],
                colors: ["cream", "beige"]
            },
            {
                id: 11,
                name: "Statement Earrings",
                description: "Bold geometric earrings with vintage appeal",
                price: 12,
                category: "accessories",
                size: "One Size",
                condition: "Excellent",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center",
                tags: ["trending", "statement"],
                colors: ["silver", "gold"]
            },
            {
                id: 12,
                name: "Vintage Graphic Tee",
                description: "Retro graphic tee with unique print and soft fabric",
                price: 26,
                category: "tops",
                size: "M",
                condition: "Good",
                image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop&crop=center",
                tags: ["sale", "graphic"],
                colors: ["white", "yellow"]
            }
        ];
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Load more button
        document.getElementById('load-more').addEventListener('click', () => {
            this.currentPage++;
            this.renderProducts(true);
        });

        // Cart functionality
        window.toggleCart = () => {
            const cartSidebar = document.getElementById('cart-sidebar');
            const cartOverlay = document.getElementById('cart-overlay');
            
            if (cartSidebar.style.transform === 'translateX(0px)') {
                this.closeCart();
            } else {
                this.openCart();
            }
        };

        // Add to cart function
        window.addToCart = (productId) => {
            const product = this.products.find(p => p.id === productId);
            if (!product) return;

            const existingItem = this.cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }

            this.updateCartUI();
            this.saveCart();
            this.showNotification(`${product.name} added to cart!`, 'success');
        };

        // Remove from cart
        window.removeFromCart = (productId) => {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.updateCartUI();
            this.saveCart();
        };

        // Update quantity
        window.updateQuantity = (productId, change) => {
            const item = this.cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    this.removeFromCart(productId);
                } else {
                    this.updateCartUI();
                    this.saveCart();
                }
            }
        };
    }

    setupFilters() {
        // Get category from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam) {
            this.currentCategory = categoryParam;
            this.filterProducts();
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === categoryParam) {
                    btn.classList.add('active');
                }
            });
        }
    }

    handleFilter(e) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter products
        this.currentCategory = e.target.dataset.category;
        this.currentPage = 1;
        this.filterProducts();
        this.renderProducts();
    }

    filterProducts() {
        if (this.currentCategory === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => 
                product.category === this.currentCategory
            );
        }
    }

    renderProducts(append = false) {
        const container = document.getElementById('products-grid');
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        const productHTML = productsToShow.map(product => `
            <div class="group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <div class="relative overflow-hidden rounded-2xl mb-4 shadow-lg">
                    <img src="${product.image}" 
                         alt="${product.name}"
                         class="w-full h-80 object-cover">
                    
                    <!-- Product Badge -->
                    ${product.tags.includes('new') ? 
                        '<div class="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">New</div>' : 
                        ''}
                    ${product.tags.includes('sale') ? 
                        '<div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">Sale</div>' : 
                        ''}
                    
                    <!-- Quick Add Button -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button onclick="addToCart(${product.id})" 
                                class="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 transform hover:scale-105">
                            <i class="fas fa-shopping-bag"></i>
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">${product.name}</h3>
                    <p class="text-gray-600 text-sm line-clamp-2">${product.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-bold text-gray-900">$${product.price}</span>
                        <span class="text-sm text-gray-500">Size: ${product.size}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-gray-100 px-2 py-1 rounded-full">${product.condition}</span>
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">${product.category}</span>
                    </div>
                </div>
            </div>
        `).join('');

        if (append) {
            container.innerHTML += productHTML;
        } else {
            container.innerHTML = productHTML;
        }

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (endIndex >= this.filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    openCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        cartSidebar.style.transform = 'translateX(0)';
        cartOverlay.style.opacity = '1';
        cartOverlay.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        cartSidebar.style.transform = 'translateX(100%)';
        cartOverlay.style.opacity = '0';
        cartOverlay.style.visibility = 'hidden';
        document.body.style.overflow = '';
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Update cart items
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center text-gray-500 mt-20">
                    <i class="fas fa-shopping-bag text-4xl mb-4"></i>
                    <p>Your cart is empty</p>
                    <button onclick="toggleCart()" class="mt-4 text-blue-600 hover:text-blue-800">Continue Shopping</button>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="flex items-center space-x-4 py-4 border-b">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-900">${item.name}</h4>
                        <p class="text-sm text-gray-600">Size: ${item.size}</p>
                        <p class="text-sm font-semibold text-blue-600">$${item.price}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="updateQuantity(${item.id}, -1)" 
                                class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="w-8 text-center">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" 
                                class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" 
                            class="text-red-500 hover:text-red-700">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    saveCart() {
        localStorage.setItem('oddFyndsCart', JSON.stringify(this.cart));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the shop when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.shopPage = new ShopPage();
    console.log('🛍️ OddFynds Shop Page Loaded! ✨');
});