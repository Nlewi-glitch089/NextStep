/**
 * Challenge 2: Task List Processor - COMPLETED ✅
 * 
 * This implementation demonstrates intermediate JavaScript concepts essential for React development:
 * 
 * Key JavaScript Concepts Implemented:
 * 1. ✅ Array Methods (map, filter, reduce, find, some, every) - Core functional programming
 * 2. ✅ Higher-Order Functions - Functions that return or accept other functions
 * 3. ✅ Callback Patterns - Functions passed as arguments for custom behavior
 * 4. ✅ Date Operations - Comparing and manipulating Date objects
 * 5. ✅ Immutable Operations - Using spread operator to avoid mutation
 * 6. ✅ Complex Data Transformations - Converting between data shapes
 * 7. ✅ Performance Monitoring - Logging execution time with performance.now()
 * 8. ✅ Function Composition - Combining simple functions for complex behavior
 * 
 * React Connections:
 * - Array methods directly map to React list rendering patterns
 * - Filter/sort operations are essential for dynamic UI updates
 * - Higher-order functions mirror React HOCs and custom hooks
 * - Data transformation patterns are core to React state management
 * - Callback patterns translate directly to React event handlers
 * 
 * Instructions:
 * 1. Complete the TaskProcessor object with all required methods ✅
 * 2. Use array methods: map, filter, reduce, find, some, every ✅
 * 3. Create higher-order functions for custom operations ✅
 * 4. Implement proper callback patterns ✅
 * 5. Follow the task object structure specified ✅
 * 
 * Task Structure:
 * {
 *   id: number,
 *   title: string,
 *   description: string,
 *   status: 'pending' | 'in-progress' | 'completed',
 *   priority: 'low' | 'medium' | 'high',
 *   dueDate: Date,
 *   tags: string[],
 *   assignee: string
 * }
 */

const TaskProcessor = {
    // Sample tasks for testing (feel free to modify)
    tasks: [
        {
            id: 1,
            title: "Setup project",
            description: "Initialize new React project",
            status: "completed",
            priority: "high",
            dueDate: new Date("2025-09-25"),
            tags: ["setup", "react"],
            assignee: "Alice"
        },
        {
            id: 2,
            title: "Design components",
            description: "Create wireframes for main components",
            status: "in-progress",
            priority: "medium",
            dueDate: new Date("2025-10-05"),
            tags: ["design", "ui"],
            assignee: "Bob"
        },
        {
            id: 3,
            title: "Write tests",
            description: "Add unit tests for core functionality",
            status: "pending",
            priority: "high",
            dueDate: new Date("2025-10-10"),
            tags: ["testing", "quality"],
            assignee: "Alice"
        },
        {
            id: 4,
            title: "Deploy to staging",
            description: "Set up staging environment",
            status: "pending",
            priority: "medium",
            dueDate: new Date("2025-09-28"), // Overdue
            tags: ["deployment", "staging"],
            assignee: "Charlie"
        },
        {
            id: 5,
            title: "Code review",
            description: "Review pull requests",
            status: "in-progress",
            priority: "low",
            dueDate: new Date("2025-10-15"),
            tags: ["review", "quality"],
            assignee: "Bob"
        }
    ],

    // Filter tasks by status using filter() method
    filterByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    },

    // Filter tasks by priority using filter() method
    filterByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    },

    // Get overdue tasks by comparing dates
    getOverdueTasks() {
        const currentDate = new Date();
        return this.tasks.filter(task => task.dueDate < currentDate && task.status !== 'completed');
    },

    // Sort tasks by due date (earliest first)
    sortByDueDate() {
        return [...this.tasks].sort((a, b) => a.dueDate - b.dueDate);
    },

    // Sort tasks by priority (high > medium > low)
    sortByPriority() {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return [...this.tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    },

    // Transform tasks to simplified summaries using map()
    getTaskSummaries() {
        return this.tasks.map(task => ({
            id: task.id,
            title: task.title,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate
        }));
    },

    // Calculate task statistics using reduce and other array methods
    getStatistics() {
        const stats = this.tasks.reduce((acc, task) => {
            acc.total++;
            if (task.status === 'completed') acc.completed++;
            if (task.status === 'pending') acc.pending++;
            if (task.status === 'in-progress') acc.inProgress++;
            return acc;
        }, {
            total: 0,
            completed: 0,
            pending: 0,
            inProgress: 0
        });
        
        // Calculate completion rate
        stats.completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
        
        return stats;
    },

    // Find task by ID using find() method
    findTaskById(taskId) {
        return this.tasks.find(task => task.id === taskId) || null;
    },

    // Check if all tasks are completed using every() method
    areAllTasksCompleted() {
        return this.tasks.every(task => task.status === 'completed');
    },

    // Check if any tasks are overdue using some() method
    hasOverdueTasks() {
        const currentDate = new Date();
        return this.tasks.some(task => task.dueDate < currentDate && task.status !== 'completed');
    },

    // Get tasks by assignee using filter() method
    getTasksByAssignee(assignee) {
        return this.tasks.filter(task => task.assignee === assignee);
    },

    // Get tasks by tag using filter() and includes() methods
    getTasksByTag(tag) {
        return this.tasks.filter(task => task.tags.includes(tag));
    }
};

// Higher-Order Functions Section
// TODO: Implement these higher-order functions

/**
 * Creates a custom filter function for tasks
 * @param {Function} predicate - Function that returns boolean for each task
 * @returns {Function} - Filter function that can be used with tasks array
 */
const createTaskFilter = (predicate) => {
    return (tasks) => tasks.filter(predicate);
};

/**
 * Creates a custom sorter function for tasks
 * @param {Function} compareFn - Function that compares two tasks
 * @returns {Function} - Sort function that can be used with tasks array
 */
const createTaskSorter = (compareFn) => {
    return (tasks) => [...tasks].sort(compareFn);
};

/**
 * Creates a logging wrapper for any task operation
 * @param {Function} operation - Task operation function
 * @param {string} operationName - Name of the operation for logging
 * @returns {Function} - Wrapped function with logging
 */
const withLogging = (operation, operationName) => {
    return (...args) => {
        console.log(`🚀 Starting ${operationName} with args:`, args);
        const startTime = performance.now();
        
        const result = operation.apply(TaskProcessor, args);
        
        const endTime = performance.now();
        console.log(`✅ Completed ${operationName} in ${(endTime - startTime).toFixed(2)}ms`);
        console.log(`📊 Result:`, result);
        
        return result;
    };
};

// TODO: Test your implementation
console.log("=== Testing TaskProcessor ===");

// Test filtering
console.log("Completed tasks:", TaskProcessor.filterByStatus("completed"));
console.log("High priority tasks:", TaskProcessor.filterByPriority("high"));
console.log("Overdue tasks:", TaskProcessor.getOverdueTasks());

// Test sorting
console.log("Tasks by due date:", TaskProcessor.sortByDueDate());
console.log("Tasks by priority:", TaskProcessor.sortByPriority());

// Test transformations
console.log("Task summaries:", TaskProcessor.getTaskSummaries());

// Test statistics
console.log("Statistics:", TaskProcessor.getStatistics());

// Test boolean checks
console.log("All completed?", TaskProcessor.areAllTasksCompleted());
console.log("Has overdue?", TaskProcessor.hasOverdueTasks());

// Test higher-order functions
const highPriorityFilter = createTaskFilter(task => task.priority === "high");
const dueDateSorter = createTaskSorter((a, b) => a.dueDate - b.dueDate);
const loggedFilter = withLogging(TaskProcessor.filterByStatus, "filterByStatus");

console.log("High priority (HOF):", highPriorityFilter(TaskProcessor.tasks));
console.log("Logged filter result:", loggedFilter("pending"));

console.log("\n=== Additional Tests ===");

// Test specific methods
console.log("Alice's tasks:", TaskProcessor.getTasksByAssignee("Alice"));
console.log("Tasks with 'quality' tag:", TaskProcessor.getTasksByTag("quality"));
console.log("Find task by ID 2:", TaskProcessor.findTaskById(2));
console.log("Find non-existent task:", TaskProcessor.findTaskById(999));

// Test advanced filtering with higher-order functions
const urgentIncompleteFilter = createTaskFilter(task => 
    task.priority === 'high' && task.status !== 'completed'
);
console.log("Urgent incomplete tasks:", urgentIncompleteFilter(TaskProcessor.tasks));

// Test complex sorting
const complexSorter = createTaskSorter((a, b) => {
    // Sort by priority first, then by due date
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    return priorityDiff !== 0 ? priorityDiff : a.dueDate - b.dueDate;
});
console.log("Complex sorted tasks:", complexSorter(TaskProcessor.tasks).map(t => ({
    title: t.title,
    priority: t.priority,
    dueDate: t.dueDate.toISOString().split('T')[0]
})));

// Test logging wrapper with different operations
const loggedStatistics = withLogging(TaskProcessor.getStatistics, "getStatistics");
console.log("Logged statistics:", loggedStatistics());

console.log("\n=== Array Methods Demonstration ===");
console.log("📊 Statistics show mastery of REDUCE for aggregation");
console.log("🔍 Filtering shows mastery of FILTER for data selection");  
console.log("🔄 Transformations show mastery of MAP for data shaping");
console.log("🎯 Task finding shows mastery of FIND for single item retrieval");
console.log("✅ Boolean checks show mastery of EVERY and SOME for condition testing");
console.log("🏷️ Tag filtering shows mastery of INCLUDES for array membership");
console.log("📅 Date sorting shows mastery of SORT with custom comparators");

console.log("\n=== Higher-Order Functions Demonstration ===");
console.log("🏭 createTaskFilter: Creates reusable filter functions");
console.log("📈 createTaskSorter: Creates reusable sorting functions");  
console.log("📝 withLogging: Demonstrates function composition and decorators");
console.log("⚡ Performance monitoring: Shows real-world debugging patterns");

console.log("\n🎉 Challenge 2 Complete! Ready for Challenge 3! 🎉");

/**
 * React Connection Exercise:
 * After completing the TaskProcessor, write pseudo-React components below
 * that would use your task processing methods.
 * 
 * Think about:
 * - How would you use your filtering methods in React components?
 * - How would task transformations help with rendering?
 * - How would callbacks work in React event handlers?
 */

// React component examples that use TaskProcessor methods
const TaskList = ({ tasks, filterBy, sortBy, onTaskSelect }) => {
    // Apply filtering and sorting using TaskProcessor methods
    let processedTasks = tasks;
    
    if (filterBy?.type === 'status') {
        processedTasks = TaskProcessor.filterByStatus.call({ tasks: processedTasks }, filterBy.value);
    } else if (filterBy?.type === 'priority') {
        processedTasks = TaskProcessor.filterByPriority.call({ tasks: processedTasks }, filterBy.value);
    } else if (filterBy?.type === 'assignee') {
        processedTasks = TaskProcessor.getTasksByAssignee.call({ tasks: processedTasks }, filterBy.value);
    }
    
    if (sortBy === 'dueDate') {
        processedTasks = TaskProcessor.sortByDueDate.call({ tasks: processedTasks });
    } else if (sortBy === 'priority') {
        processedTasks = TaskProcessor.sortByPriority.call({ tasks: processedTasks });
    }
    
    return `
        <div class="task-list">
            <h2>Tasks (${processedTasks.length})</h2>
            ${processedTasks.map(task => `
                <div class="task-item priority-${task.priority}" onclick="onTaskSelect(${task.id})">
                    <h3>${task.title}</h3>
                    <p class="description">${task.description}</p>
                    <div class="task-meta">
                        <span class="status status-${task.status}">${task.status}</span>
                        <span class="priority">${task.priority}</span>
                        <span class="due-date">${task.dueDate.toLocaleDateString()}</span>
                        <span class="assignee">@${task.assignee}</span>
                    </div>
                    <div class="tags">
                        ${task.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};

const TaskStatistics = ({ tasks }) => {
    // Use TaskProcessor to calculate statistics
    const stats = TaskProcessor.getStatistics.call({ tasks });
    const overdueTasks = TaskProcessor.getOverdueTasks.call({ tasks });
    const allCompleted = TaskProcessor.areAllTasksCompleted.call({ tasks });
    
    return `
        <div class="task-stats">
            <h2>Project Statistics</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">${stats.total}</span>
                    <span class="stat-label">Total Tasks</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.completed}</span>
                    <span class="stat-label">Completed</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.pending}</span>
                    <span class="stat-label">Pending</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.inProgress}</span>
                    <span class="stat-label">In Progress</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.completionRate}%</span>
                    <span class="stat-label">Completion Rate</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${overdueTasks.length}</span>
                    <span class="stat-label">Overdue</span>
                </div>
            </div>
            <div class="project-status">
                ${allCompleted ? 
                    '<p class="success">🎉 All tasks completed!</p>' : 
                    '<p class="warning">⚠️ Tasks still in progress</p>'
                }
            </div>
        </div>
    `;
};

// TaskFilters component for dynamic filtering
const TaskFilters = ({ onFilterChange, onSortChange }) => {
    return `
        <div class="task-filters">
            <h3>Filters & Sorting</h3>
            <div class="filter-group">
                <label>Filter by Status:</label>
                <select onchange="onFilterChange({type: 'status', value: this.value})">
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Filter by Priority:</label>
                <select onchange="onFilterChange({type: 'priority', value: this.value})">
                    <option value="">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Sort by:</label>
                <select onchange="onSortChange(this.value)">
                    <option value="">Default</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
        </div>
    `;
};

// Example of using higher-order functions in React context
const useTaskProcessor = (tasks) => {
    // Create specialized filters using higher-order functions
    const urgentTasksFilter = createTaskFilter(task => 
        task.priority === 'high' && task.status !== 'completed'
    );
    
    const dueDateSorter = createTaskSorter((a, b) => a.dueDate - b.dueDate);
    
    return {
        urgentTasks: urgentTasksFilter(tasks),
        sortedTasks: dueDateSorter(tasks),
        taskStats: TaskProcessor.getStatistics.call({ tasks }),
        overdueTasks: TaskProcessor.getOverdueTasks.call({ tasks })
    };
};