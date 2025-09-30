/**
 * Challenge 2: Task List Processor
 * 
 * Instructions:
 * 1. Complete the TaskProcessor object with all required methods
 * 2. Use array methods: map, filter, reduce, find, some, every
 * 3. Create higher-order functions for custom operations
 * 4. Implement proper callback patterns
 * 5. Follow the task object structure specified
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
        }
        // TODO: Add more sample tasks for testing
    ],

    // TODO: Implement method to filter tasks by status
    // Should return array of tasks with matching status
    filterByStatus(status) {
        // Your code here using filter()

    },

    // TODO: Implement method to filter tasks by priority
    // Should return array of tasks with matching priority
    filterByPriority(priority) {
        // Your code here using filter()

    },

    // TODO: Implement method to get overdue tasks
    // Should return tasks where dueDate is before current date
    getOverdueTasks() {
        // Your code here using filter() and Date comparison

    },

    // TODO: Implement method to sort tasks by due date
    // Should return new array sorted by dueDate (earliest first)
    sortByDueDate() {
        // Your code here using sort()

    },

    // TODO: Implement method to sort tasks by priority
    // Priority order: high > medium > low
    sortByPriority() {
        // Your code here using sort() with custom comparator

    },

    // TODO: Implement method to transform tasks for display
    // Should return array of simplified task objects with only essential fields
    getTaskSummaries() {
        // Your code here using map()
        // Return: { id, title, status, priority, dueDate }

    },

    // TODO: Implement method to calculate task statistics
    // Should return object with: total, completed, pending, inProgress, completionRate
    getStatistics() {
        // Your code here using reduce() or multiple array methods

    },

    // TODO: Implement method to find task by ID
    // Should return task object or null if not found
    findTaskById(taskId) {
        // Your code here using find()

    },

    // TODO: Implement method to check if all tasks are completed
    // Should return boolean
    areAllTasksCompleted() {
        // Your code here using every()

    },

    // TODO: Implement method to check if any tasks are overdue
    // Should return boolean
    hasOverdueTasks() {
        // Your code here using some()

    },

    // TODO: Implement method to get tasks by assignee
    // Should return array of tasks assigned to specific person
    getTasksByAssignee(assignee) {
        // Your code here using filter()

    },

    // TODO: Implement method to get tasks by tag
    // Should return array of tasks that include the specified tag
    getTasksByTag(tag) {
        // Your code here using filter() and array includes()

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
    // Your code here
    // Return a function that filters tasks using the provided predicate

};

/**
 * Creates a custom sorter function for tasks
 * @param {Function} compareFn - Function that compares two tasks
 * @returns {Function} - Sort function that can be used with tasks array
 */
const createTaskSorter = (compareFn) => {
    // Your code here
    // Return a function that sorts tasks using the provided compare function

};

/**
 * Creates a logging wrapper for any task operation
 * @param {Function} operation - Task operation function
 * @param {string} operationName - Name of the operation for logging
 * @returns {Function} - Wrapped function with logging
 */
const withLogging = (operation, operationName) => {
    // Your code here
    // Return a function that logs before and after the operation

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

// Example React component structure (write your own):
const TaskList = ({ tasks, filterBy, sortBy, onTaskSelect }) => {
    // Your component logic here using TaskProcessor methods
    return `
        <div class="task-list">
            <!-- Your JSX structure here -->
        </div>
    `;
};

const TaskStatistics = ({ tasks }) => {
    // Your component logic here
    return `
        <div class="task-stats">
            <!-- Your statistics display here -->
        </div>
    `;
};

// TODO: Write more React component examples that use your TaskProcessor