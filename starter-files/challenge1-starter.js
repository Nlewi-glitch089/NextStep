/**
 * Challenge 1: User Data Manager - COMPLETED ✅
 * 
 * This implementation demonstrates JavaScript fundamentals essential for React development:
 * 
 * Key JavaScript Concepts Implemented:
 * 1. ✅ Variable declarations (const/let) - Proper scoping and immutability
 * 2. ✅ Object destructuring - Used in parameters and assignment
 * 3. ✅ Default parameters - Applied to preferences in addUser method
 * 4. ✅ Spread operator - For immutable updates and object merging
 * 5. ✅ Array methods - find, filter, findIndex, map for data manipulation
 * 6. ✅ Error handling - Validation and meaningful error messages
 * 7. ✅ Unique ID generation - Simple auto-increment system
 * 8. ✅ Immutable data handling - Preventing external modification
 * 
 * React Connections:
 * - Object destructuring patterns used here are identical to React props destructuring
 * - Immutable update patterns mirror React state management best practices
 * - Data validation concepts apply to form handling in React
 * - Array filtering methods are essential for React list rendering and filtering
 * 
 * Instructions:
 * 1. Complete the UserManager object with all required methods ✅
 * 2. Use proper variable declarations (const/let) ✅
 * 3. Implement object destructuring where appropriate ✅
 * 4. Use default parameters in functions ✅
 * 5. Follow the user object structure specified ✅
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
    // Initialize users array
    users: [],

    // Generate unique ID for new users
    _generateId() {
        return this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
    },

    // Add a new user with destructuring and default preferences
    addUser(userData) {
        // Destructure userData with defaults
        const { 
            name, 
            email, 
            age, 
            preferences = { theme: "light", notifications: true } 
        } = userData;

        // Validate required fields
        if (!name || !email) {
            throw new Error("Name and email are required");
        }

        // Check for duplicate email
        const existingUser = this.users.find(user => user.email === email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        // Create new user object
        const newUser = {
            id: this._generateId(),
            name,
            email,
            age,
            preferences: {
                theme: "light",
                notifications: true,
                ...preferences // Spread operator to override defaults
            }
        };

        // Add to users array
        this.users.push(newUser);
        
        return newUser;
    },

    // Update user information using destructuring and preserving existing data
    updateUser(userId, updates) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            return null;
        }

        const currentUser = this.users[userIndex];
        
        // Destructure updates and merge with existing data
        const { name, email, age, preferences } = updates;
        
        // Create updated user object preserving existing data
        const updatedUser = {
            ...currentUser,
            ...(name && { name }),
            ...(email && { email }),
            ...(age && { age }),
            ...(preferences && { 
                preferences: { 
                    ...currentUser.preferences, 
                    ...preferences 
                }
            })
        };

        this.users[userIndex] = updatedUser;
        return updatedUser;
    },

    // Get user by ID
    getUserById(userId) {
        const user = this.users.find(user => user.id === userId);
        return user || null;
    },

    // Get all users (return copy to prevent external modification)
    getAllUsers() {
        return [...this.users];
    },

    // Get users by preference using array methods and destructuring
    getUsersByPreference(preferenceKey, preferenceValue) {
        return this.users.filter(user => {
            const { preferences } = user;
            return preferences && preferences[preferenceKey] === preferenceValue;
        });
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

// Additional tests for edge cases
console.log("\n=== Additional Tests ===");

// Test user with custom preferences
const user3 = UserManager.addUser({
    name: "Charlie Brown",
    email: "charlie@example.com", 
    age: 22,
    preferences: {
        theme: "dark",
        notifications: true
    }
});

console.log("User 3 with custom preferences:", user3);

// Test getting non-existent user
console.log("Non-existent user (should be null):", UserManager.getUserById(999));

// Test updating non-existent user
console.log("Update non-existent user (should be null):", UserManager.updateUser(999, { age: 30 }));

// Test filtering by notifications
console.log("Users with notifications enabled:", UserManager.getUsersByPreference('notifications', true));

// Test partial user update (preserving existing data)
UserManager.updateUser(user2.id, { age: 36 });
console.log("User 2 after partial update:", UserManager.getUserById(user2.id));

console.log("\n=== Error Handling Tests ===");

// Test error handling for missing required fields
try {
    UserManager.addUser({ age: 25 }); // Missing name and email
} catch (error) {
    console.log("Expected error for missing fields:", error.message);
}

// Test error handling for duplicate email
try {
    UserManager.addUser({
        name: "Alice Clone",
        email: "alice@example.com", // Duplicate email
        age: 30
    });
} catch (error) {
    console.log("Expected error for duplicate email:", error.message);
}

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

// React component examples that use the UserManager structure
const UserProfile = ({ user: { id, name, email, age, preferences } }) => {
    // Destructuring user prop in the parameter
    const { theme, notifications } = preferences;
    
    return `
        <div class="user-profile" data-theme="${theme}">
            <h2>User Profile</h2>
            <div class="user-info">
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Age:</strong> ${age}</p>
            </div>
            <div class="user-preferences">
                <h3>Preferences</h3>
                <p><strong>Theme:</strong> ${theme}</p>
                <p><strong>Notifications:</strong> ${notifications ? 'Enabled' : 'Disabled'}</p>
            </div>
        </div>
    `;
};

// UserList component with props destructuring
const UserList = ({ users, onUserSelect }) => {
    return `
        <div class="user-list">
            <h2>All Users</h2>
            ${users.map(({ id, name, email }) => `
                <div class="user-item" onclick="onUserSelect(${id})">
                    <h3>${name}</h3>
                    <p>${email}</p>
                </div>
            `).join('')}
        </div>
    `;
};

// UserSettings component for updating user preferences
const UserSettings = ({ user, onUpdate }) => {
    const { id, preferences: { theme, notifications } } = user;
    
    return `
        <div class="user-settings">
            <h2>User Settings</h2>
            <form onsubmit="handleSettingsUpdate(event, ${id})">
                <div class="setting-group">
                    <label for="theme">Theme:</label>
                    <select id="theme" value="${theme}">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div class="setting-group">
                    <label for="notifications">
                        <input type="checkbox" id="notifications" ${notifications ? 'checked' : ''}>
                        Enable Notifications
                    </label>
                </div>
                <button type="submit">Update Settings</button>
            </form>
        </div>
    `;
};

// Example of how these components would handle UserManager data
const handleSettingsUpdate = (event, userId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const updates = {
        preferences: {
            theme: formData.get('theme'),
            notifications: formData.get('notifications') === 'on'
        }
    };
    
    UserManager.updateUser(userId, updates);
};