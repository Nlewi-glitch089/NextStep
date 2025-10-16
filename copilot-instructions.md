# 🌟 Copilot Code Generation Guidelines
These instructions help GitHub Copilot understand how to generate code that fits my preferred style and structure across all projects.

---

## 🧩 Naming Conventions

- Use **PascalCase** for component names (e.g., `UserProfile`, `MainLayout`).
- Use **camelCase** for variable and function names (e.g., `getUserData`, `userInput`).
- Prefix **private class members** with an underscore (`_isLoading`).
- Use **ALL_CAPS** for constants (`MAX_RETRIES`, `API_URL`).

---

## ⚙️ Error Handling

- Always use **try/catch** for async operations (like API calls or file reads).
- When handling errors, **include context** (what was being done when the error happened).
- Use **React error boundaries** to catch errors in UI components and prevent the app from crashing.

---

## ⚛️ React Coding Practices

- Use **functional components** instead of class components.
- Always follow **React Hook Rules** — never call hooks inside loops, conditions, or nested functions.
- Use **React.FC** for components that take `children`.
- Keep components **small and focused** — one component = one clear purpose.
- Use **CSS modules or separate CSS files** for styling, not inline styles.
- Keep **JSX readable** — use spacing, indentation, and group related sections logically.
- Use **meaningful component names** that describe what the component does.

---

## 🎨 Styling Guidelines

- Keep all styles in a **separate CSS file** (e.g., `ComponentName.css`).
- Follow **consistent spacing and indentation** (2 or 4 spaces depending on the project setup).
- Prefer **class names** that are descriptive and follow the pattern `component-element-state`  
  (Example: `button-primary-disabled`).
- Keep colors, fonts, and layout values in **variables or utility classes** if possible.

---

## 🧠 Code Quality & Readability

- Write **self-explanatory code** — variable names should describe their purpose.
- Add **comments** when logic might not be immediately clear.
- Avoid **repetition** — if you use something more than twice, make it a function or component.
- Keep files **organized** — related files go in the same folder (e.g., `components`, `pages`, `hooks`).
- Use **console.log** for debugging, but remove them before final commits.
- When writing async code, prefer `async/await` over `.then()` for cleaner syntax.

---

## 🧪 Testing & Debugging (Optional)

- Test new features with **basic example data**.
- Check that components handle **empty, null, or unexpected input** gracefully.
- Use **browser dev tools** to check console logs, network requests, and layout.

---

## 🗂 File & Folder Organization

- Group related code logically:
  - `/components` → reusable UI parts
  - `/pages` → full page layouts
  - `/styles` → CSS files
  - `/assets` → images, icons, fonts
- Each component gets its **own folder** if it has multiple files (e.g., `Component.jsx`, `Component.css`).
- Name files consistently — `HomePage.jsx`, `Navbar.jsx`, `AICounselor.jsx`.

---

## 💬 Comments & Documentation

- Write comments that explain **why** something is done, not just **what** it does.
- Use `// TODO:` for future improvements.
- Add a short description at the top of complex files or functions explaining their role.

---