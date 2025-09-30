/**
 * Challenge 1: User Data Manager
 * 
 * Instructions:
 * 1. Complete the UserManager object with all required methods
 * 2. Use proper variable declarations (const/let)
 * 3. Implement object destructuring where appropriate
 * 4. Use default parameters in functions
 * 5. Follow the user object structure specified
 * 
 * User Structure:
 * {
 *   id: number,
 *   name: string,
 *   email: string,
 *   age: number,
 *   preferences: {
 *     theme: string,
 *     notifications: boolean
 *   }
 * }
 */

const UserManager = {
    // TODO: Initialize users array
    users: [],

    // TODO: Implement method to add a new user
    // Should generate unique ID and use default preferences if not provided
    addUser(userData) {
        // Your code here
        // Remember to use destructuring and default values

    },

    // TODO: Implement method to update user information
    // Should use object destructuring and preserve existing data
    updateUser(userId, updates) {
        // Your code here

    },

    // TODO: Implement method to get user by ID
    // Should return user object or null if not found
    getUserById(userId) {
        // Your code here

    },

    // TODO: Implement method to get all users
    // Should return copy of users array
    getAllUsers() {
        // Your code here

    },

    // TODO: Implement method to get users by preference
    // Example: getUsersByPreference('theme', 'dark')
    getUsersByPreference(preferenceKey, preferenceValue) {
        // Your code here
        // Use array methods and destructuring

    }
};

// TODO: Test your implementation
console.log("=== Testing UserManager ===");

// Test adding users
const user1 = UserManager.addUser({
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28
});

const user2 = UserManager.addUser({
    name: "Bob Smith",
    email: "bob@example.com",
    age: 35,
    preferences: {
        theme: "light",
        notifications: false
    }
});

console.log("Added users:", UserManager.getAllUsers());

// Test getting user by ID
console.log("User 1:", UserManager.getUserById(user1.id));

// Test updating user
UserManager.updateUser(user1.id, {
    age: 29,
    preferences: { theme: "dark" }
});

console.log("Updated user 1:", UserManager.getUserById(user1.id));

// Test filtering by preferences
console.log("Dark theme users:", UserManager.getUsersByPreference('theme', 'dark'));

/**
 * React Connection Exercise:
 * After completing the UserManager, write pseudo-React components below
 * that would use your user data structure.
 * 
 * Think about:
 * - How would you pass user data as props?
 * - How would destructuring work in component parameters?
 * - How would you handle user updates in a React component?
 */

// Example React component structure (write your own):
const UserProfile = ({ user /* destructure here */ }) => {
    // Your component logic here
    return `
        <div class="user-profile">
            <!-- Your JSX structure here -->
        </div>
    `;
};

// TODO: Write more React component examples that use your UserManager