# JavaScript Fundamentals Challenges

## 🎯 Challenge Overview

Complete these 3 progressive challenges to master JavaScript fundamentals for React development. Each challenge builds upon the previous one and introduces concepts that directly apply to React patterns.

---

## Challenge 1: User Data Manager 👤
**Difficulty:** Beginner  
**Focus:** Variables, Objects, Destructuring, Basic Functions  
**React Connection:** Props handling and state management

### ⏱️ Time Investment Guide
| Learning Approach | Beginner | Experienced | 
|-------------------|----------|-------------|
| **Traditional** | 3-6 hours | 1-2 hours |
| **AI-Assisted** | 1-2 hours | 30-45 min |
| **Learning by Teaching** | 2-3 hours | 1-1.5 hours |

### � **Essential Learning Resources**
**Core Concepts**: Variables, Objects, Destructuring, Basic Functions

**📺 Must-Watch Videos**:
- **[JavaScript ES6 Destructuring](https://www.youtube.com/watch?v=NIq3qLaHCIs)** (12 min) - Core concept for this challenge
- **[JavaScript Objects](https://www.youtube.com/watch?v=X0ipw1k7ygU)** (15 min) - Object manipulation basics
- **[Const vs Let vs Var](https://www.youtube.com/watch?v=9WIJQDvt4Us)** (12 min) - Variable declarations

**🎓 Practice Before Building**:
- **[Codecademy: JavaScript Objects](https://www.codecademy.com/learn/introduction-to-javascript)** - Objects section
- **[JavaScript.info: Objects](https://javascript.info/object)** - Read before starting
- **[MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)** - Reference guide

### �📋 Challenge Description

Create a user data management system that demonstrates how JavaScript object manipulation translates to React component props and state handling.

### 🎯 Requirements

1. Create a `UserManager` object with methods to:
   - Add new users
   - Update user information
   - Get user by ID
   - Get all users

2. Implement the following features:
   - Use `const` and `let` appropriately
   - Use object destructuring for user data
   - Use default parameters in functions
   - Store users in an array of objects

3. Each user should have:
   ```javascript
   {
     id: number,
     name: string,
     email: string,
     age: number,
     preferences: {
       theme: string,
       notifications: boolean
     }
   }
   ```

### 📝 Starter Code Location
Use the starter file: `starter-files/challenge1-starter.js`

### ✅ Success Criteria

- [ ] UserManager can add users with proper validation
- [ ] User data is properly destructured when accessed
- [ ] Default values are used for optional fields
- [ ] All functions use appropriate variable declarations
- [ ] Code demonstrates React-ready patterns

### 🔗 React Connection Exercise

After completing the challenge, write pseudo-React components that would use your UserManager:

```jsx
// Example of how your code translates to React
const UserProfile = ({ user: { name, age, email, preferences } }) => {
    const { theme, notifications } = preferences;
    // Your user object structure should work here
};
```

---

## Challenge 2: Task List Processor 📝
**Difficulty:** Intermediate  
**Focus:** Arrays, Map/Filter/Reduce, Callbacks, Higher-Order Functions  
**React Connection:** List rendering and data transformation

### ⏱️ Time Investment Guide
| Learning Approach | Intermediate | Experienced | 
|-------------------|--------------|-------------|
| **Traditional** | 6-10 hours | 3-5 hours |
| **AI-Assisted** | 2-4 hours | 1-2 hours |
| **Learning by Teaching** | 4-6 hours | 2-3 hours |

### � **Essential Learning Resources**
**Core Concepts**: Array Methods, Higher-Order Functions, Callbacks, Functional Programming

**📺 Must-Watch Videos**:
- **[Array Map, Filter, Reduce](https://www.youtube.com/watch?v=UXiYii0Y7Nw)** (15 min each) - Essential for this challenge
- **[Higher Order Functions](https://www.youtube.com/watch?v=BMUiFMZr7vk)** (25 min) - Advanced patterns
- **[JavaScript Array Methods](https://www.youtube.com/watch?v=R8rmfD9Y5-c)** (36 min) - Comprehensive overview

**🎓 Practice Before Building**:
- **[JavaScript30 - Array Cardio](https://javascript30.com/)** - Wes Bos exercises (Free)
- **[freeCodeCamp: Functional Programming](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)** - Complete section
- **[Codewars: Array Challenges](https://www.codewars.com/)** - Practice with 6-7 kyu problems

### �📋 Challenge Description

Build a task management system that processes and transforms data using modern array methods. This challenge mimics the data flow patterns commonly used in React applications.

### 🎯 Requirements

1. Create a `TaskProcessor` class/object with methods to:
   - Filter tasks by status (completed, pending, overdue)
   - Sort tasks by priority or due date
   - Transform task data for display
   - Calculate statistics (total, completed percentage, etc.)

2. Implement these array operations:
   - Use `map()` to transform task data
   - Use `filter()` to create filtered views
   - Use `reduce()` to calculate aggregated data
   - Use `find()` to locate specific tasks
   - Use `some()` and `every()` for condition checking

3. Each task should have:
   ```javascript
   {
     id: number,
     title: string,
     description: string,
     status: 'pending' | 'in-progress' | 'completed',
     priority: 'low' | 'medium' | 'high',
     dueDate: Date,
     tags: string[],
     assignee: string
   }
   ```

4. Create higher-order functions for:
   - Creating custom filters
   - Creating custom sorters
   - Logging operations

### 📝 Starter Code Location
Use the starter file: `starter-files/challenge2-starter.js`

### ✅ Success Criteria

- [ ] All array methods are used correctly
- [ ] Custom filter and sort functions work properly
- [ ] Statistics calculations are accurate
- [ ] Higher-order functions demonstrate callback patterns
- [ ] Code structure mirrors React data flow patterns

### 🔗 React Connection Exercise

Write pseudo-React components that demonstrate how your task processing would work in a React app:

```jsx
// Example of how your code translates to React
const TaskList = ({ tasks, filterBy, sortBy }) => {
    const filteredTasks = tasks.filter(/* your filter logic */);
    const sortedTasks = filteredTasks.sort(/* your sort logic */);
    
    return (
        <div>
            {sortedTasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

const TaskStats = ({ tasks }) => {
    const stats = /* your statistics calculation */;
    return <div>{/* display stats */}</div>;
};
```

---

## Challenge 3: Event-Driven Shopping Cart 🛒
**Difficulty:** Advanced  
**Focus:** All concepts combined + Advanced Callbacks  
**React Connection:** Event handling, state updates, and component communication

### ⏱️ Time Investment Guide
| Learning Approach | Advanced | Experienced | 
|-------------------|----------|-------------|
| **Traditional** | 10-20 hours | 6-10 hours |
| **AI-Assisted** | 3-6 hours | 2-3 hours |
| **Learning by Teaching** | 6-10 hours | 4-6 hours |

### � **Essential Learning Resources**
**Core Concepts**: Event Systems, Complex Callbacks, Integration Patterns, Advanced Architecture

**📺 Must-Watch Videos**:
- **[JavaScript Event Delegation](https://www.youtube.com/watch?v=pKzf80F3O0U)** (15 min) - Event patterns
- **[Callback Functions Deep Dive](https://www.youtube.com/watch?v=cNjIUSDnb9k)** (12 min) - Advanced callbacks
- **[JavaScript Design Patterns](https://www.youtube.com/watch?v=kuirGzhGhyw)** (45 min) - Architecture concepts

**🎓 Practice Before Building**:
- **[JavaScript.info: Event Handling](https://javascript.info/introduction-browser-events)** - Complete tutorial
- **[freeCodeCamp: Intermediate Algorithm Scripting](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)** - Complex problems
- **[Frontend Mentor: JavaScript Projects](https://www.frontendmentor.io/challenges?languages=JS)** - Real-world practice

### �📋 Challenge Description

Create a complete shopping cart system that uses callbacks for event handling, mimicking how React components communicate through props and events. This challenge combines all previous concepts in a React-like architecture.

### 🎯 Requirements

1. Create a `ShoppingCart` system with:
   - Product catalog management
   - Cart operations (add, remove, update quantity)
   - Price calculations with discounts
   - Event system for cart changes

2. Implement callback-based event system:
   - `onItemAdded(item, cart)`
   - `onItemRemoved(item, cart)`
   - `onQuantityChanged(item, newQuantity, cart)`
   - `onCartCleared(cart)`
   - `onCheckout(cart, total)`

3. Use all JavaScript concepts:
   - Complex object destructuring
   - Array methods for cart operations
   - Higher-order functions for discounts and calculations
   - Default parameters and rest/spread operators
   - Proper variable scoping

4. Product structure:
   ```javascript
   {
     id: number,
     name: string,
     price: number,
     category: string,
     inStock: boolean,
     tags: string[],
     discounts: {
       percentage?: number,
       minQuantity?: number,
       validUntil?: Date
     }
   }
   ```

5. Cart item structure:
   ```javascript
   {
     product: Product,
     quantity: number,
     addedAt: Date
   }
   ```

### 📝 Starter Code Location
Use the starter file: `starter-files/challenge3-starter.js`

### ✅ Success Criteria

- [ ] Complete event-driven architecture with callbacks
- [ ] Complex price calculations with discounts
- [ ] Proper use of all JavaScript concepts covered
- [ ] Clean separation of concerns (like React components)
- [ ] Comprehensive error handling
- [ ] Code that could easily translate to React

### 🔗 React Connection Exercise

Design the React component structure that would use your shopping cart system:

```jsx
// Example React implementation of your system
const ShoppingApp = () => {
    const [cart, setCart] = useState([]);
    const [products] = useState(/* your product data */);
    
    const handleItemAdded = (item, updatedCart) => {
        setCart(updatedCart);
        // Your callback logic here
    };
    
    return (
        <div>
            <ProductCatalog 
                products={products}
                onAddToCart={handleItemAdded}
            />
            <ShoppingCart 
                items={cart}
                onQuantityChange={handleQuantityChanged}
                onRemoveItem={handleItemRemoved}
            />
        </div>
    );
};
```

---

## 🏆 Bonus Challenges

### Bonus 1: Performance Optimization
Optimize your solutions using:
- Memoization patterns
- Efficient array operations
- Minimal object creation

### Bonus 2: TypeScript Conversion
Convert one of your solutions to TypeScript, adding:
- Interface definitions
- Type annotations
- Generic functions

### Bonus 3: Testing
Write unit tests for your functions using:
- Jest or similar testing framework
- Test all edge cases
- Mock external dependencies

---

## 📊 Progress Tracking

### Challenge 1 Completion: ⬜
- [ ] Basic requirements met
- [ ] React connection exercise completed
- [ ] Code review passed

### Challenge 2 Completion: ⬜
- [ ] Array methods implemented correctly
- [ ] Higher-order functions working
- [ ] React patterns identified

### Challenge 3 Completion: ⬜
- [ ] Event system fully functional
- [ ] All concepts integrated
- [ ] React architecture planned

---

## 🎯 Learning Outcomes

After completing these challenges, you should be able to:

1. **Confidently use modern JavaScript syntax** in React applications
2. **Transform data efficiently** using array methods for React rendering
3. **Handle events and callbacks** like a React developer
4. **Structure code** that translates naturally to React components
5. **Debug and optimize** JavaScript code for better React performance

---

## 🚀 Next Steps

1. **Complete all three challenges** in order
2. **Compare your solutions** with the provided examples
3. **Practice the React connection exercises**
4. **Try the bonus challenges** for deeper understanding
5. **Apply these patterns** in a real React project

Remember: The goal isn't just to complete the challenges, but to understand how each JavaScript concept directly applies to React development!

---

**Ready to start?** Open `starter-files/challenge1-starter.js` and begin your journey!