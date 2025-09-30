/**
 * Challenge 3: Event-Driven Shopping Cart
 * 
 * Instructions:
 * 1. Complete the ShoppingCart system with all required functionality
 * 2. Implement callback-based event system
 * 3. Use complex object destructuring and all array methods
 * 4. Create higher-order functions for discounts and calculations
 * 5. Follow the product and cart item structures specified
 * 
 * Product Structure:
 * {
 *   id: number,
 *   name: string,
 *   price: number,
 *   category: string,
 *   inStock: boolean,
 *   tags: string[],
 *   discounts: {
 *     percentage?: number,
 *     minQuantity?: number,
 *     validUntil?: Date
 *   }
 * }
 * 
 * Cart Item Structure:
 * {
 *   product: Product,
 *   quantity: number,
 *   addedAt: Date
 * }
 */

// Sample products for testing
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        category: "Electronics",
        inStock: true,
        tags: ["audio", "wireless", "bluetooth"],
        discounts: {
            percentage: 10,
            minQuantity: 2,
            validUntil: new Date("2025-12-31")
        }
    },
    {
        id: 2,
        name: "Coffee Mug",
        price: 12.99,
        category: "Kitchen",
        inStock: true,
        tags: ["kitchen", "ceramic", "coffee"],
        discounts: {}
    },
    {
        id: 3,
        name: "JavaScript Book",
        price: 29.99,
        category: "Books",
        inStock: false,
        tags: ["programming", "education", "javascript"],
        discounts: {
            percentage: 15,
            validUntil: new Date("2025-10-15")
        }
    }
    // TODO: Add more sample products for testing
];

class ShoppingCart {
    constructor() {
        this.items = [];
        this.eventListeners = {
            itemAdded: [],
            itemRemoved: [],
            quantityChanged: [],
            cartCleared: [],
            checkout: []
        };
    }

    // Event system methods
    // TODO: Implement method to register event listeners
    addEventListener(eventType, callback) {
        // Your code here
        // Add callback to appropriate event listeners array

    }

    // TODO: Implement method to remove event listeners
    removeEventListener(eventType, callback) {
        // Your code here
        // Remove callback from event listeners array

    }

    // TODO: Implement method to trigger events
    // Should call all registered callbacks for the event type
    triggerEvent(eventType, ...args) {
        // Your code here
        // Call all callbacks with provided arguments

    }

    // Cart operations
    // TODO: Implement method to add item to cart
    // Should trigger 'itemAdded' event with (item, cart)
    addItem(product, quantity = 1) {
        // Your code here
        // Check if product is in stock
        // If item exists, update quantity
        // If new item, add to cart
        // Trigger event

    }

    // TODO: Implement method to remove item from cart
    // Should trigger 'itemRemoved' event with (item, cart)
    removeItem(productId) {
        // Your code here
        // Find and remove item
        // Trigger event

    }

    // TODO: Implement method to update item quantity
    // Should trigger 'quantityChanged' event with (item, newQuantity, cart)
    updateQuantity(productId, newQuantity) {
        // Your code here
        // Update quantity or remove if 0
        // Trigger event

    }

    // TODO: Implement method to clear entire cart
    // Should trigger 'cartCleared' event with (cart)
    clearCart() {
        // Your code here
        // Clear all items
        // Trigger event

    }

    // TODO: Implement method to get cart items
    // Should return copy of items array
    getItems() {
        // Your code here

    }

    // TODO: Implement method to find item in cart
    // Should return cart item or null if not found
    findItem(productId) {
        // Your code here using find()

    }

    // TODO: Implement method to get total item count
    // Should return total quantity of all items
    getTotalItemCount() {
        // Your code here using reduce()

    }

    // Calculation methods
    // TODO: Implement method to calculate item subtotal (before discounts)
    calculateItemSubtotal(cartItem) {
        // Your code here
        // Return price * quantity

    }

    // TODO: Implement method to calculate item discount
    // Should apply product discounts based on quantity and validity
    calculateItemDiscount(cartItem) {
        // Your code here
        // Check discount conditions and calculate discount amount

    }

    // TODO: Implement method to calculate item total (after discounts)
    calculateItemTotal(cartItem) {
        // Your code here
        // Return subtotal - discount

    }

    // TODO: Implement method to calculate cart subtotal
    // Should return total of all items before discounts
    calculateSubtotal() {
        // Your code here using reduce() and calculateItemSubtotal()

    }

    // TODO: Implement method to calculate total discounts
    // Should return total discount amount for all items
    calculateTotalDiscounts() {
        // Your code here using reduce() and calculateItemDiscount()

    }

    // TODO: Implement method to calculate cart total
    // Should return final total after all discounts
    calculateTotal() {
        // Your code here

    }

    // TODO: Implement checkout method
    // Should trigger 'checkout' event with (cart, total)
    // Should clear cart after successful checkout
    checkout() {
        // Your code here
        // Calculate total
        // Trigger checkout event
        // Clear cart

    }
}

// Product Catalog class
class ProductCatalog {
    constructor(products = []) {
        this.products = products;
    }

    // TODO: Implement method to get all products
    getAllProducts() {
        // Your code here

    }

    // TODO: Implement method to find product by ID
    findProductById(productId) {
        // Your code here using find()

    }

    // TODO: Implement method to filter products by category
    getProductsByCategory(category) {
        // Your code here using filter()

    }

    // TODO: Implement method to filter products by tag
    getProductsByTag(tag) {
        // Your code here using filter() and includes()

    }

    // TODO: Implement method to get in-stock products only
    getInStockProducts() {
        // Your code here using filter()

    }

    // TODO: Implement method to search products by name
    searchProducts(searchTerm) {
        // Your code here using filter() and includes() (case-insensitive)

    }
}

// Higher-Order Functions for advanced operations

// TODO: Implement function that creates custom discount calculators
const createDiscountCalculator = (discountRules) => {
    // Your code here
    // Return function that calculates discount based on rules

};

// TODO: Implement function that creates price formatters
const createPriceFormatter = (currency = "USD", locale = "en-US") => {
    // Your code here
    // Return function that formats prices with currency

};

// TODO: Implement function that creates cart validators
const createCartValidator = (validationRules) => {
    // Your code here
    // Return function that validates cart based on rules

};

// TODO: Test your implementation
console.log("=== Testing Shopping Cart System ===");

// Initialize catalog and cart
const catalog = new ProductCatalog(SAMPLE_PRODUCTS);
const cart = new ShoppingCart();

// Set up event listeners
cart.addEventListener('itemAdded', (item, cart) => {
    console.log(`Added ${item.quantity} x ${item.product.name} to cart`);
});

cart.addEventListener('quantityChanged', (item, newQuantity, cart) => {
    console.log(`Updated ${item.product.name} quantity to ${newQuantity}`);
});

cart.addEventListener('checkout', (cartItems, total) => {
    console.log(`Checkout completed! Total: $${total.toFixed(2)}`);
});

// Test adding items
const headphones = catalog.findProductById(1);
const mug = catalog.findProductById(2);

cart.addItem(headphones, 2);
cart.addItem(mug, 1);

// Test calculations
console.log("Cart items:", cart.getItems());
console.log("Subtotal:", cart.calculateSubtotal());
console.log("Total discounts:", cart.calculateTotalDiscounts());
console.log("Final total:", cart.calculateTotal());

// Test checkout
cart.checkout();

/**
 * React Connection Exercise:
 * After completing the ShoppingCart system, write pseudo-React components below
 * that would use your shopping cart and product catalog.
 * 
 * Think about:
 * - How would you manage cart state in React?
 * - How would events translate to React event handlers?
 * - How would you structure components for reusability?
 * - How would you handle cart updates and re-renders?
 */

// Example React component structure (write your own):
const ShoppingApp = () => {
    // Your component logic here
    // Consider: useState for cart, useEffect for loading products, etc.
    return `
        <div class="shopping-app">
            <!-- Your JSX structure here -->
        </div>
    `;
};

const ProductCard = ({ product, onAddToCart }) => {
    // Your component logic here
    return `
        <div class="product-card">
            <!-- Your product display here -->
        </div>
    `;
};

const CartSummary = ({ cart, onQuantityChange, onRemoveItem, onCheckout }) => {
    // Your component logic here
    return `
        <div class="cart-summary">
            <!-- Your cart display here -->
        </div>
    `;
};

// TODO: Write more React component examples that use your shopping cart system