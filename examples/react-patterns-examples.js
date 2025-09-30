/**
 * React Patterns Using JavaScript Fundamentals
 * 
 * This file demonstrates how the JavaScript concepts translate
 * directly to React development patterns.
 */

// Note: This is pseudo-React code for demonstration purposes
// In a real project, you would import React and use JSX

// ========================================
// 1. COMPONENT PROPS WITH DESTRUCTURING
// ========================================

// Modern React component using destructuring
const UserCard = ({
    user: { name, email, avatar },  // Nested destructuring
    onEdit,                         // Callback prop
    isEditable = false,            // Default parameter
    className = "user-card",       // Default parameter
    ...restProps                   // Rest properties
}) => {
    // Event handler using arrow function
    const handleEditClick = () => {
        onEdit?.({ name, email });  // Optional chaining
    };

    return (
        `<div class="${className}" ${Object.entries(restProps).map(([k, v]) => `${k}="${v}"`).join(' ')}>
            <img src="${avatar}" alt="${name}" />
            <div class="user-info">
                <h3>${name}</h3>
                <p>${email}</p>
                ${isEditable ? `<button onclick="handleEditClick()">Edit</button>` : ''}
            </div>
        </div>`
    );
};

// ========================================
// 2. STATE MANAGEMENT WITH MODERN JS
// ========================================

const TodoApp = () => {
    // Simulating React hooks with modern JS
    let todos = [];
    let filter = 'all';

    // State updater using spread operator
    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        };
        todos = [...todos, newTodo];  // Immutable update
        renderApp();
    };

    // State updater using map
    const toggleTodo = (id) => {
        todos = todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }  // Object spread
                : todo
        );
        renderApp();
    };

    // State updater using filter
    const deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
        renderApp();
    };

    // Computed values using array methods
    const getVisibleTodos = () => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'pending':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    };

    const getStatistics = () => {
        return todos.reduce((stats, todo) => {
            stats.total++;
            if (todo.completed) stats.completed++;
            return stats;
        }, { total: 0, completed: 0 });
    };

    const renderApp = () => {
        const visibleTodos = getVisibleTodos();
        const stats = getStatistics();

        return `
            <div class="todo-app">
                <TodoStats stats="${JSON.stringify(stats)}" />
                <TodoForm onSubmit="${addTodo}" />
                <TodoFilter currentFilter="${filter}" onFilterChange="${(f) => filter = f}" />
                <TodoList 
                    todos="${JSON.stringify(visibleTodos)}"
                    onToggle="${toggleTodo}"
                    onDelete="${deleteTodo}"
                />
            </div>
        `;
    };

    return renderApp();
};

// ========================================
// 3. LIST RENDERING WITH MAP
// ========================================

const TodoList = ({ todos, onToggle, onDelete }) => {
    // Using map for list rendering (most important React pattern)
    const todoItems = todos.map(todo =>
        TodoItem({
            key: todo.id,      // Key prop for React reconciliation
            todo,
            onToggle,
            onDelete
        })
    ).join('');

    return `
        <ul class="todo-list">
            ${todoItems}
        </ul>
    `;
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
    // Destructuring in component
    const { id, text, completed } = todo;

    // Event handlers as arrow functions
    const handleToggle = () => onToggle(id);
    const handleDelete = () => onDelete(id);

    return `
        <li class="todo-item ${completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                ${completed ? 'checked' : ''}
                onchange="handleToggle()"
            />
            <span class="todo-text">${text}</span>
            <button onclick="handleDelete()" class="delete-btn">Delete</button>
        </li>
    `;
};

// ========================================
// 4. CONDITIONAL RENDERING WITH LOGICAL OPERATORS
// ========================================

const UserProfile = ({ user, isLoading, error }) => {
    // Early return pattern
    if (isLoading) {
        return '<div class="loading">Loading user profile...</div>';
    }

    if (error) {
        return '<div class="error">Error: ' + error.message + '</div>';
    }

    if (!user) {
        return '<div class="no-user">No user data available</div>';
    }

    // Destructuring with default values
    const {
        name = 'Unknown User',
        email,
        avatar,
        profile: {
            bio = 'No bio available',
            location = 'Location not specified'
        } = {}
    } = user;

    return `
        <div class="user-profile">
            <img src="${avatar}" alt="${name}" />
            <h2>${name}</h2>
            ${email ? `<p class="email">${email}</p>` : ''}
            <p class="bio">${bio}</p>
            <p class="location">${location}</p>
        </div>
    `;
};

// ========================================
// 5. HIGHER-ORDER COMPONENTS (HOCs)
// ========================================

// HOC for adding loading state
const withLoading = (Component) => {
    return ({ isLoading, ...props }) => {
        if (isLoading) {
            return '<div class="loading-spinner">Loading...</div>';
        }
        return Component(props);
    };
};

// HOC for error boundaries
const withErrorBoundary = (Component) => {
    return (props) => {
        try {
            return Component(props);
        } catch (error) {
            console.error('Component error:', error);
            return '<div class="error-boundary">Something went wrong!</div>';
        }
    };
};

// Usage of HOCs
const UserCardWithLoading = withLoading(UserCard);
const SafeUserCard = withErrorBoundary(UserCardWithLoading);

// ========================================
// 6. CUSTOM HOOKS SIMULATION
// ========================================

// Simulating custom hooks with functions that return state and updaters
const useLocalStorage = (key, initialValue) => {
    let value = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : initialValue;

    const setValue = (newValue) => {
        value = newValue;
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setValue];
};

const useTodos = () => {
    const [todos, setTodos] = useLocalStorage('todos', []);

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Computed values
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        stats: {
            completed: completedCount,
            total: totalCount,
            progress: Math.round(progress)
        }
    };
};

// ========================================
// 7. FORM HANDLING WITH MODERN JS
// ========================================

const ContactForm = ({ onSubmit, initialData = {} }) => {
    // Simulating form state
    let formData = {
        name: '',
        email: '',
        message: '',
        preferences: {
            newsletter: false,
            updates: true
        },
        ...initialData  // Merge with initial data
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            // Handle nested field updates
            const [parent, child] = field.split('.');
            formData = {
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value
                }
            };
        } else {
            formData = {
                ...formData,
                [field]: value
            };
        }
    };

    // Form validation using array methods
    const validateForm = () => {
        const errors = [];

        if (!formData.name.trim()) {
            errors.push('Name is required');
        }

        if (!formData.email.includes('@')) {
            errors.push('Valid email is required');
        }

        if (formData.message.length < 10) {
            errors.push('Message must be at least 10 characters');
        }

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validateForm();
        if (errors.length > 0) {
            console.log('Validation errors:', errors);
            return;
        }

        // Transform data before submission
        const submissionData = {
            ...formData,
            submittedAt: new Date(),
            preferences: Object.entries(formData.preferences)
                .filter(([key, value]) => value)
                .map(([key]) => key)
        };

        onSubmit(submissionData);
    };

    return `
        <form onsubmit="handleSubmit(event)" class="contact-form">
            <input 
                type="text" 
                placeholder="Your Name"
                value="${formData.name}"
                onchange="handleInputChange('name', this.value)"
            />
            <input 
                type="email" 
                placeholder="Your Email"
                value="${formData.email}"
                onchange="handleInputChange('email', this.value)"
            />
            <textarea 
                placeholder="Your Message"
                onchange="handleInputChange('message', this.value)"
            >${formData.message}</textarea>
            
            <div class="preferences">
                <label>
                    <input 
                        type="checkbox" 
                        ${formData.preferences.newsletter ? 'checked' : ''}
                        onchange="handleInputChange('preferences.newsletter', this.checked)"
                    />
                    Subscribe to newsletter
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        ${formData.preferences.updates ? 'checked' : ''}
                        onchange="handleInputChange('preferences.updates', this.checked)"
                    />
                    Receive updates
                </label>
            </div>
            
            <button type="submit">Send Message</button>
        </form>
    `;
};

// ========================================
// 8. DATA FETCHING PATTERNS
// ========================================

const useApiData = (url, options = {}) => {
    let data = null;
    let loading = true;
    let error = null;

    const fetchData = async () => {
        try {
            loading = true;
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            data = result;
            error = null;
        } catch (err) {
            error = err;
            data = null;
        } finally {
            loading = false;
        }
    };

    // Auto-fetch on initialization
    fetchData();

    return { data, loading, error, refetch: fetchData };
};

const UserList = ({ apiUrl }) => {
    const { data: users, loading, error, refetch } = useApiData(apiUrl);

    if (loading) {
        return '<div class="loading">Loading users...</div>';
    }

    if (error) {
        return `
            <div class="error">
                <p>Error loading users: ${error.message}</p>
                <button onclick="refetch()">Try Again</button>
            </div>
        `;
    }

    if (!users || users.length === 0) {
        return '<div class="no-data">No users found</div>';
    }

    // Transform and filter data using array methods
    const activeUsers = users
        .filter(user => user.active)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(user => ({
            ...user,
            displayName: `${user.name} (${user.email})`
        }));

    const userItems = activeUsers.map(user =>
        UserCard({
            key: user.id,
            user,
            onEdit: (userData) => console.log('Edit user:', userData),
            isEditable: true
        })
    ).join('');

    return `
        <div class="user-list">
            <h2>Active Users (${activeUsers.length})</h2>
            ${userItems}
            <button onclick="refetch()">Refresh</button>
        </div>
    `;
};

// ========================================
// 9. COMPLETE APP EXAMPLE
// ========================================

const App = () => {
    // Combining all patterns
    const { todos, addTodo, toggleTodo, deleteTodo, stats } = useTodos();

    const [users, setUsers] = useLocalStorage('users', []);
    const [currentView, setCurrentView] = useLocalStorage('currentView', 'todos');

    // Navigation handler
    const handleNavigation = (view) => {
        setCurrentView(view);
    };

    // Main render method
    const renderCurrentView = () => {
        switch (currentView) {
            case 'todos':
                return TodoApp({
                    todos,
                    onAddTodo: addTodo,
                    onToggleTodo: toggleTodo,
                    onDeleteTodo: deleteTodo,
                    stats
                });
            case 'users':
                return UserList({ users });
            case 'profile':
                return UserProfile({ user: users[0] });
            default:
                return '<div>Page not found</div>';
        }
    };

    return `
        <div class="app">
            <nav class="app-nav">
                <button 
                    class="${currentView === 'todos' ? 'active' : ''}"
                    onclick="handleNavigation('todos')"
                >
                    Todos (${stats.total})
                </button>
                <button 
                    class="${currentView === 'users' ? 'active' : ''}"
                    onclick="handleNavigation('users')"
                >
                    Users (${users.length})
                </button>
                <button 
                    class="${currentView === 'profile' ? 'active' : ''}"
                    onclick="handleNavigation('profile')"
                >
                    Profile
                </button>
            </nav>
            
            <main class="app-content">
                ${renderCurrentView()}
            </main>
        </div>
    `;
};

// Initialize and render the app
console.log("React patterns demonstration completed!");
console.log("Key takeaways:");
console.log("1. Destructuring makes prop handling clean and readable");
console.log("2. Array methods (map, filter, reduce) are essential for data transformation");
console.log("3. Spread operator enables immutable state updates");
console.log("4. Arrow functions provide concise event handlers");
console.log("5. Higher-order functions enable component composition");
console.log("6. Modern JS patterns translate directly to React best practices");