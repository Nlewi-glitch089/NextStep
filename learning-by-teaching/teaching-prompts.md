# Teaching Prompt Templates for JavaScript Challenges

## 🎯 How to Use These Templates

Each template is designed to help you teach an LLM to solve JavaScript problems step-by-step. Copy the appropriate template, fill in the specific details for your challenge, and begin your teaching session.

---

## 📝 Challenge 1: Teaching Object Manipulation (Beginner)

### Phase 1: Concept Teaching Template
```
Hi! I'm going to teach you about JavaScript object manipulation and destructuring. Let's start with the basics.

First, I want to explain what destructuring is and why it's useful:
[Your explanation here - explain in your own words]

Can you tell me what you understand about destructuring so far? 
What questions do you have?

Now let me show you the difference between var, let, and const:
[Your explanation here - teach the differences]

Based on what I've taught you, can you explain back to me when you would use each one?
```

### Phase 2: Problem-Solving Guidance Template
```
Great! Now I want you to help me solve a user management problem. But instead of giving you the solution, I'll guide you through thinking about it.

The problem: We need to create a system that manages user data with the following structure:
{
  id: number,
  name: string,
  email: string,
  age: number,
  preferences: { theme: string, notifications: boolean }
}

First question: If I want to create a function that adds a new user, what parameters should it accept? Think about it and tell me what you think.

[Wait for response, then guide further]

Good thinking! Now, when someone passes user data to this function, how could we use destructuring to extract the values? Can you write a destructuring statement that would work?
```

### Phase 3: Solution Evaluation Template
```
Now I want you to write a function called addUser() based on our discussion. I'll review your code and help you improve it.

[Let the LLM write the function]

Let me give you feedback on your solution:
- [Point out what works well]
- [Identify areas for improvement]
- [Ask questions about their choices]

Why did you choose to [specific design decision]? 
How would this pattern help in a React component?
```

---

## 🔄 Challenge 2: Teaching Array Methods & HOFs (Intermediate)

### Phase 1: Concept Teaching Template
```
I'm going to teach you about higher-order functions and how they work with arrays. This is crucial for React development.

A higher-order function is [your explanation]. Let me give you an example:
[Provide your own example]

Now, the array methods map(), filter(), and reduce() are all higher-order functions. Let me explain each one:

map(): [Your explanation with example]
filter(): [Your explanation with example]
reduce(): [Your explanation with example]

Can you explain back to me the difference between these three methods? What does each one return?
```

### Phase 2: Problem-Solving Guidance Template
```
Perfect! Now let's apply this to a task management system. 

Imagine you have an array of task objects like this:
{
  id: 1,
  title: "Learn JavaScript",
  status: "completed",
  priority: "high",
  dueDate: new Date(),
  tags: ["learning", "coding"]
}

I want you to think step by step:

1. If I wanted to get only the completed tasks, which array method would I use and why?
2. If I wanted to create a summary with just the titles and priorities, which method would I use?
3. If I wanted to count how many high-priority tasks there are, which method would work best?

Answer each question and explain your reasoning.
```

### Phase 3: Callback Function Teaching Template
```
Excellent! Now I want to teach you about creating custom filter functions. This is where higher-order functions get really powerful.

Instead of writing filter logic directly, we can create functions that return other functions:

[Explain the concept of function factories]

Can you try to write a function called createStatusFilter that takes a status string and returns a filter function? Don't worry about perfection - I'll help you refine it.

[Review their attempt and provide guidance]
```

---

## 🛒 Challenge 3: Teaching Event Systems (Advanced)

### Phase 1: Event Architecture Teaching Template
```
I'm going to teach you about event-driven programming and how it relates to React. This is advanced stuff!

In JavaScript, we can create systems where different parts communicate through events. Think of it like a messaging system:
[Explain with your own analogy]

The key concepts are:
1. Event emitters (things that trigger events)
2. Event listeners (things that respond to events)
3. Callback functions (the actual response code)

Can you think of a real-world example where this pattern would be useful? How would this work in a shopping cart?
```

### Phase 2: System Design Guidance Template
```
Great! Now let's design a shopping cart system together. I'll guide you through the architecture.

We need several components:
1. ProductCatalog (manages available products)
2. ShoppingCart (manages cart state)
3. PriceCalculator (handles pricing logic)
4. EventSystem (coordinates communication)

Let's start with the EventSystem. What methods do you think it needs? Think about:
- How do components register to listen for events?
- How do components trigger events?
- How do we prevent memory leaks?

Tell me your ideas, and I'll help you refine them.
```

### Phase 3: React Connection Teaching Template
```
Excellent work! Now I want you to see how this event system is similar to React patterns.

In React, we have:
- Props (data flowing down)
- Callbacks (events flowing up)
- State (managed data)
- useEffect (side effects)

Can you match each part of our shopping cart system to these React concepts:
1. When cart state changes → ?
2. When user clicks "Add to Cart" → ?
3. When we need to update the UI → ?
4. When we need to calculate totals → ?

Explain your matches and why you think they correspond.
```

---

## 💡 Teaching Tips

### For Students:
1. **Explain in your own words** - Don't copy definitions
2. **Use analogies** - Relate to things the LLM might understand
3. **Ask for feedback** - Make sure the LLM understands before moving on
4. **Be patient** - Teaching requires iteration and refinement
5. **Connect to React** - Always bridge to practical applications

### Common Teaching Challenges:
- **LLM gives perfect answer too quickly** → Ask it to explain its reasoning
- **LLM seems confused** → Break down your explanation into smaller parts
- **LLM copies your examples exactly** → Ask it to create its own examples
- **Discussion gets off-track** → Redirect with specific questions

---

## 🎯 Success Indicators

You're teaching effectively when:
- The LLM asks clarifying questions
- The LLM can explain concepts back in different words
- The LLM applies concepts to new scenarios
- The LLM catches errors in provided code
- The LLM suggests alternative approaches