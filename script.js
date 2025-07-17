// Application State
let currentUser = null;
let products = [];
let cart = [];
let filteredProducts = [];
let currentAuthMode = 'login';

// Mock Database
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' }
];

const mockProducts = [
    { id: 1, name: 'Smartphone', price: 699.99, category: 'electronics', image: '📱', description: 'Latest smartphone with advanced features' },
    { id: 2, name: 'Laptop', price: 1299.99, category: 'electronics', image: '💻', description: 'High-performance laptop for work and gaming' },
    { id: 3, name: 'T-Shirt', price: 29.99, category: 'clothing', image: '👕', description: 'Comfortable cotton t-shirt' },
    { id: 4, name: 'Jeans', price: 79.99, category: 'clothing', image: '👖', description: 'Premium denim jeans' },
    { id: 5, name: 'JavaScript Book', price: 45.99, category: 'books', image: '📚', description: 'Complete guide to JavaScript programming' },
    { id: 6, name: 'Garden Tools', price: 89.99, category: 'home', image: '🛠️', description: 'Complete set of garden tools' },
    { id: 7, name: 'Wireless Headphones', price: 199.99, category: 'electronics', image: '🎧', description: 'Premium wireless headphones' },
    { id: 8, name: 'Dress', price: 99.99, category: 'clothing', image: '👗', description: 'Elegant evening dress' },
    { id: 9, name: 'Cooking Book', price: 35.99, category: 'books', image: '📖', description: 'Master chef cooking recipes' },
    { id: 10, name: 'Plant Pot', price: 25.99, category: 'home', image: '🪴', description: 'Decorative ceramic plant pot' }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCartFromStorage();
    checkAuthState();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('auth-form').addEventListener('submit', handleAuth);
}

// Authentication Functions
function showAuthModal(mode) {
    currentAuthMode = mode;
    const modal = new bootstrap.Modal(document.getElementById('auth-modal'));
    
    if (mode === 'login') {
        document.getElementById('auth-modal-title').textContent = 'Login';
        document.getElementById('auth-submit-btn').textContent = 'Login';
        document.getElementById('name-field').style.display = 'none';
        document.getElementById('auth-switch-text').textContent = "Don't have an account?";
        document.getElementById('auth-switch-link').textContent = 'Register here';
    } else {
        document.getElementById('auth-modal-title').textContent = 'Register';
        document.getElementById('auth-submit-btn').textContent = 'Register';
        document.getElementById('name-field').style.display = 'block';
        document.getElementById('auth-switch-text').textContent = 'Already have an account?';
        document.getElementById('auth-switch-link').textContent = 'Login here';
    }
    
    modal.show();
}

function switchAuthMode() {
    currentAuthMode = currentAuthMode === 'login' ? 'register' : 'login';
    showAuthModal(currentAuthMode);
}

function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    
    if (currentAuthMode === 'login') {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            updateAuthUI();
            showAlert('Login successful!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('auth-modal')).hide();
        } else {
            showAlert('Invalid credentials!', 'danger');
        }
    } else {
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            showAlert('User already exists!', 'danger');
        } else {
            const newUser = {
                id: mockUsers.length + 1,
                name: name,
                email: email,
                password: password
            };
            mockUsers.push(newUser);
            currentUser = newUser;
            updateAuthUI();
            showAlert('Registration successful!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('auth-modal')).hide();
        }
    }
    
    document.getElementById('auth-form').reset();
}

function logout() {
    currentUser = null;
    updateAuthUI();
    showAlert('Logged out successfully!', 'info');
    showSection('home');
}

function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    
    if (currentUser) {
        authButtons.classList.add('d-none');
        userInfo.classList.remove('d-none');
        document.getElementById('username').textContent = currentUser.name;
    } else {
        authButtons.classList.remove('d-none');
        userInfo.classList.add('d-none');
    }
}

function checkAuthState() {
    // In a real app, you'd check for stored tokens/sessions
    updateAuthUI();
}

// Product Functions
function loadProducts() {
    showLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
        products = [...mockProducts];
        filteredProducts = [...products];
        displayProducts();
        showLoading(false);
    }, 500);
}

function displayProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    col.innerHTML = `
        <div class="card product-card h-100">
            <div class="product-image">${product.image}</div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text flex-grow-1">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="price-tag">$${product.price}</span>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    
    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(query) || 
                            product.description.toLowerCase().includes(query);
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
    });
    
    displayProducts();
}

function filterProducts() {
    searchProducts(); // Reuse search logic
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    saveCartToStorage();
    showAlert(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
    showAlert('Item removed from cart!', 'info');
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    totalAmount.textContent = total.toFixed(2);
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
        document.getElementById('checkout-btn').disabled = true;
    } else {
        document.getElementById('checkout-btn').disabled = false;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-2">
                        <div class="text-center" style="font-size: 2rem;">${item.image}</div>
                    </div>
                    <div class="col-4">
                        <h6>${item.name}</h6>
                        <small class="text-muted">$${item.price}</small>
                    </div>
                    <div class="col-3">
                        <div class="input-group">
                            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="col-2">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <div class="col-1">
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
}

function showCart() {
    const modal = new bootstrap.Modal(document.getElementById('cart-modal'));
    modal.show();
}

function checkout() {
    if (!currentUser) {
        showAlert('Please login to checkout!', 'warning');
        bootstrap.Modal.getInstance(document.getElementById('cart-modal')).hide();
        showAuthModal('login');
        return;
    }
    
    if (cart.length === 0) {
        showAlert('Your cart is empty!', 'warning');
        return;
    }
    
    // Simulate checkout process
    showAlert('Processing order...', 'info');
    
    setTimeout(() => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart = [];
        updateCartUI();
        saveCartToStorage();
        bootstrap.Modal.getInstance(document.getElementById('cart-modal')).hide();
        showAlert(`Order placed successfully! Total: $${total.toFixed(2)}`, 'success');
    }, 2000);
}

// Storage Functions
function saveCartToStorage() {
    // In a real app, you'd use localStorage or send to server
    // For this demo, we'll just keep it in memory
}

function loadCartFromStorage() {
    // In a real app, you'd load from localStorage or server
    updateCartUI();
}

// UI Helper Functions
function showSection(sectionName) {
    document.getElementById('home-section').classList.add('d-none');
    document.getElementById('products-section').classList.add('d-none');
    
    if (sectionName === 'products') {
        document.getElementById('products-section').classList.remove('d-none');
    } else {
        document.getElementById('home-section').classList.remove('d-none');
    }
}

function showLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    const grid = document.getElementById('products-grid');
    
    if (show) {
        spinner.style.display = 'block';
        grid.style.display = 'none';
    } else {
        spinner.style.display = 'none';
        grid.style.display = 'block';
    }
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show alert-custom`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// API Simulation (RESTful-like structure)
const API = {
    // Products endpoints
    products: {
        getAll: () => Promise.resolve(mockProducts),
        getById: (id) => Promise.resolve(mockProducts.find(p => p.id === id)),
        search: (query) => Promise.resolve(mockProducts.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        ))
    },
    
    // Users endpoints
    users: {
        login: (email, password) => {
            const user = mockUsers.find(u => u.email === email && u.password === password);
            return Promise.resolve(user ? { success: true, user } : { success: false });
        },
        register: (userData) => {
            const newUser = { id: mockUsers.length + 1, ...userData };
            mockUsers.push(newUser);
            return Promise.resolve({ success: true, user: newUser });
        }
    },
    
    // Orders endpoints
    orders: {
        create: (orderData) => {
            return Promise.resolve({ 
                success: true, 
                orderId: Math.random().toString(36).substr(2, 9),
                total: orderData.total 
            });
        }
    }
};

// Initialize tooltips and other Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});