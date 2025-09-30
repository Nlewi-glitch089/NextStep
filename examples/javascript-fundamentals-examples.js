/**
 * JavaScript Fundamentals Examples for React Development
 * 
 * This file contains practical examples of JavaScript concepts
 * and their direct applications in React development.
 */

// ========================================
// 1. VARIABLES & SCOPE EXAMPLES
// ========================================

console.log("=== Variables & Scope Examples ===");

// Modern variable declarations
const appName = "Task Manager";           // Immutable - perfect for app constants
let currentUser = null;                   // Mutable - changes during app lifecycle
const API_BASE_URL = "https://api.example.com";  // Constants in UPPERCASE

// Block scope demonstration
function demonstrateScope() {
    const outerVariable = "I'm in function scope";

    if (true) {
        let blockScoped = "I'm in block scope";
        const alsoBlockScoped = "Me too!";
        console.log(outerVariable);  // ✅ Accessible
        console.log(blockScoped);    // ✅ Accessible
    }

    // console.log(blockScoped);     // ❌ ReferenceError!
    console.log(outerVariable);      // ✅ Accessible
}

demonstrateScope();

// React equivalent patterns
const ReactComponentExample = () => {
    const componentName = "UserProfile";    // const for component-level constants
    let [userState, setUserState] = useState(null);  // let for destructured state

    useEffect(() => {
        const fetchUser = async () => {     // const for function declarations
            // Function logic here
        };
        fetchUser();
    }, []);

    return null; // JSX would go here
};

// ========================================
// 2. ARRAY METHODS EXAMPLES
// ========================================

console.log("=== Array Methods Examples ===");

const sampleTodos = [
    { id: 1, text: "Learn JavaScript", completed: false, priority: "high" },
    { id: 2, text: "Build React app", completed: false, priority: "medium" },
    { id: 3, text: "Deploy to production", completed: true, priority: "high" },
    { id: 4, text: "Write documentation", completed: false, priority: "low" }
];

// map() - Transform data (ESSENTIAL for React lists)
const todoTitles = sampleTodos.map(todo => todo.text);
console.log("Todo titles:", todoTitles);

// map() with complex transformation
const todoSummaries = sampleTodos.map(todo => ({
    ...todo,
    displayText: `${todo.text} (${todo.priority})`,
    status: todo.completed ? "✅" : "⏳"
}));
console.log("Todo summaries:", todoSummaries);

// filter() - Conditional rendering data
const incompleteTodos = sampleTodos.filter(todo => !todo.completed);
const highPriorityTodos = sampleTodos.filter(todo => todo.priority === "high");
console.log("Incomplete todos:", incompleteTodos);
console.log("High priority todos:", highPriorityTodos);

// reduce() - Aggregate data
const todoStats = sampleTodos.reduce((stats, todo) => {
    stats.total++;
    if (todo.completed) stats.completed++;
    if (todo.priority === "high") stats.highPriority++;
    return stats;
}, { total: 0, completed: 0, highPriority: 0 });
console.log("Todo statistics:", todoStats);

// find() - Locate specific items
const specificTodo = sampleTodos.find(todo => todo.id === 2);
console.log("Found todo:", specificTodo);

// React rendering examples
const TodoListExample = ({ todos }) => {
    // Direct mapping for rendering
    const todoElements = todos.map(todo => (
        React.createElement('li', { key: todo.id }, todo.text)
    ));

    // Filtering for conditional display
    const completedTodos = todos.filter(todo => todo.completed);

    // Statistics calculation
    const completionRate = todos.reduce((acc, todo) => {
        return acc + (todo.completed ? 1 : 0);
    }, 0) / todos.length;

    return React.createElement('div', null,
        React.createElement('ul', null, ...todoElements),
        React.createElement('p', null, `Completion: ${(completionRate * 100).toFixed(1)}%`)
    );
};

// ========================================
// 3. OBJECT & DESTRUCTURING EXAMPLES
// ========================================

console.log("=== Object & Destructuring Examples ===");

const sampleUser = {
    id: 123,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    profile: {
        avatar: "https://example.com/avatar.jpg",
        bio: "Full-stack developer",
        preferences: {
            theme: "dark",
            notifications: true,
            language: "en"
        }
    },
    roles: ["user", "developer"],
    metadata: {
        createdAt: new Date("2023-01-15"),
        lastLogin: new Date("2025-09-30")
    }
};

// Basic destructuring
const { name, email } = sampleUser;
console.log(`User: ${name} (${email})`);

// Nested destructuring
const {
    profile: {
        bio,
        preferences: { theme, notifications }
    }
} = sampleUser;
console.log(`Bio: ${bio}, Theme: ${theme}, Notifications: ${notifications}`);

// Destructuring with rename and defaults
const {
    name: userName,
    profile: {
        preferences: {
            language = "en"
        }
    },
    isActive = false  // Default value
} = sampleUser;
console.log(`${userName} speaks ${language}, Active: ${isActive}`);

// Array destructuring
const [primaryRole, secondaryRole, ...otherRoles] = sampleUser.roles;
console.log(`Primary: ${primaryRole}, Secondary: ${secondaryRole}`);

// React component examples
const UserProfileExample = ({
    user: {
        name,
        email,
        profile: {
            avatar,
            bio,
            preferences: { theme }
        }
    },
    onEdit,
    isEditable = false
}) => {
    return React.createElement('div', { className: `profile ${theme}` },
        React.createElement('img', { src: avatar, alt: name }),
        React.createElement('h2', null, name),
        React.createElement('p', null, email),
        React.createElement('p', null, bio),
        isEditable && React.createElement('button', { onClick: onEdit }, 'Edit')
    );
};

// ========================================
// 4. FUNCTIONS & MODERN SYNTAX EXAMPLES
// ========================================

console.log("=== Functions & Modern Syntax Examples ===");

// Traditional function
function traditionalGreeting(name) {
    return `Hello, ${name}!`;
}

// Arrow function variations
const arrowGreeting = (name) => `Hello, ${name}!`;
const multilineArrow = (name, age) => {
    const greeting = `Hello, ${name}!`;
    const ageInfo = age ? ` You are ${age} years old.` : "";
    return greeting + ageInfo;
};

// Default parameters
const greetWithDefault = (name = "World", enthusiastic = false) => {
    const greeting = `Hello, ${name}`;
    return enthusiastic ? `${greeting}!!!` : `${greeting}!`;
};

// Rest parameters
const combineStrings = (separator, ...strings) => {
    return strings.join(separator);
};

console.log(combineStrings(" - ", "JavaScript", "is", "awesome"));

// Spread operator
const user1 = { name: "Alice", age: 30 };
const user2 = { ...user1, email: "alice@example.com", age: 31 };
console.log("Updated user:", user2);

// React component examples
const WelcomeComponentExample = ({ name = "Guest", showAge = false, age }) => {
    const generateGreeting = (name, includeTime = false) => {
        const greeting = `Welcome, ${name}!`;
        const timeInfo = includeTime ? ` Current time: ${new Date().toLocaleTimeString()}` : "";
        return greeting + timeInfo;
    };

    return React.createElement('div', null,
        React.createElement('h1', null, generateGreeting(name, true)),
        showAge && age && React.createElement('p', null, `Age: ${age}`)
    );
};

// ========================================
// 5. CALLBACKS & HIGHER-ORDER FUNCTIONS
// ========================================

console.log("=== Callbacks & Higher-Order Functions Examples ===");

// Basic callback example
const processUserData = (userData, onSuccess, onError) => {
    try {
        const processed = {
            ...userData,
            processedAt: new Date(),
            id: Date.now()
        };
        onSuccess(processed);
    } catch (error) {
        onError(error);
    }
};

// Usage
processUserData(
    { name: "John", email: "john@example.com" },
    (result) => console.log("Success:", result),
    (error) => console.log("Error:", error)
);

// Higher-order function examples
const withLogging = (fn, label) => {
    return (...args) => {
        console.log(`[${label}] Called with:`, args);
        const result = fn(...args);
        console.log(`[${label}] Result:`, result);
        return result;
    };
};

const add = (a, b) => a + b;
const loggedAdd = withLogging(add, "ADD");
loggedAdd(5, 3);

// Array methods as higher-order functions
const numbers = [1, 2, 3, 4, 5];

const createMultiplier = (factor) => (num) => num * factor;
const double = createMultiplier(2);
const doubled = numbers.map(double);
console.log("Doubled:", doubled);

const createFilter = (condition) => (array) => array.filter(condition);
const getEvens = createFilter(num => num % 2 === 0);
console.log("Evens:", getEvens(numbers));

// React event handling examples
const ButtonExample = ({ onClick, children, disabled = false }) => {
    const handleClick = (event) => {
        if (!disabled) {
            console.log("Button clicked!");
            onClick?.(event);  // Optional callback
        }
    };

    return React.createElement('button',
        {
            onClick: handleClick,
            disabled,
            className: disabled ? "btn-disabled" : "btn-enabled"
        },
        children
    );
};

// Higher-order component example
const withErrorBoundary = (Component) => {
    return (props) => {
        try {
            return React.createElement(Component, props);
        } catch (error) {
            return React.createElement('div',
                { className: "error" },
                "Something went wrong!"
            );
        }
    };
};

const SafeUserProfile = withErrorBoundary(UserProfileExample);

// ========================================
// 6. COMPLETE EXAMPLE: TODO APP LOGIC
// ========================================

console.log("=== Complete Todo App Example ===");

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentId = 1;
        this.listeners = {
            todoAdded: [],
            todoUpdated: [],
            todoDeleted: []
        };
    }

    // Event system
    on(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }

    // CRUD operations using modern JS
    addTodo({ text, priority = "medium" }) {
        const newTodo = {
            id: this.currentId++,
            text,
            priority,
            completed: false,
            createdAt: new Date()
        };

        this.todos = [...this.todos, newTodo];  // Immutable update
        this.emit('todoAdded', newTodo);
        return newTodo;
    }

    updateTodo(id, updates) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, ...updates } : todo
        );

        const updatedTodo = this.todos.find(todo => todo.id === id);
        this.emit('todoUpdated', updatedTodo);
        return updatedTodo;
    }

    deleteTodo(id) {
        const todoToDelete = this.todos.find(todo => todo.id === id);
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.emit('todoDeleted', todoToDelete);
        return todoToDelete;
    }

    // Query methods using array methods
    getAllTodos() {
        return [...this.todos];  // Return copy
    }

    getCompletedTodos() {
        return this.todos.filter(todo => todo.completed);
    }

    getPendingTodos() {
        return this.todos.filter(todo => !todo.completed);
    }

    getTodosByPriority(priority) {
        return this.todos.filter(todo => todo.priority === priority);
    }

    searchTodos(searchTerm) {
        return this.todos.filter(todo =>
            todo.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    getStatistics() {
        return this.todos.reduce((stats, todo) => {
            stats.total++;
            if (todo.completed) stats.completed++;
            stats.byPriority[todo.priority] = (stats.byPriority[todo.priority] || 0) + 1;
            return stats;
        }, {
            total: 0,
            completed: 0,
            byPriority: {}
        });
    }
}

// Test the TodoApp
const app = new TodoApp();

// Set up event listeners
app.on('todoAdded', (todo) => console.log('Added:', todo));
app.on('todoUpdated', (todo) => console.log('Updated:', todo));
app.on('todoDeleted', (todo) => console.log('Deleted:', todo));

// Add some todos
app.addTodo({ text: "Learn JavaScript fundamentals", priority: "high" });
app.addTodo({ text: "Build a React app", priority: "medium" });
app.addTodo({ text: "Deploy to production", priority: "low" });

// Update a todo
app.updateTodo(1, { completed: true });

// Query data
console.log("All todos:", app.getAllTodos());
console.log("Completed todos:", app.getCompletedTodos());
console.log("High priority todos:", app.getTodosByPriority("high"));
console.log("Statistics:", app.getStatistics());

console.log("=== Examples Complete ===");