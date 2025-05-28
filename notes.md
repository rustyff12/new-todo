# Notes

- Need to change the way the todos are presented
- Perhaps a table is better suited like my old pure js todo app
- UI decisions
- Perhaps more is needed as far as the models go

---

## Completed

### Project Setup

- Initialized a new Vite + React + TypeScript project.

- Installed and configured Tailwind CSS v4 correctly.

- Verified Tailwind is working with a simple layout test.

### Basic UI

- Set up base layout in App.tsx with header, main, footer structure.

- Styled Header component with Tailwind.

- Made header responsive: menu button on mobile, full nav on larger screens (planned, if not fully implemented).

- Ensured utility classes like bg-slate-800, text-white, shadow-md work correctly.

- Fixed icon alignment issue with lucide-react icons (Check/X).

- Used Flexbox utilities (flex, items-center, gap) to align elements cleanly.

### Components

- Built and styled ToDoItem component.

- Used Lucide icons in a React-friendly, stylistically aligned way.

## To Do Next

### Functionality

- Add a form to create new todo items.

- Implement delete functionality for todo items.

- Hook into backend/API (if applicable) or manage todos via state.

### State Management

- Use local React state or a global store (like Context or Zustand) to manage the todo list.

- Persist todos to localStorage or a backend.

### UI Improvements

- Finish responsive navigation (menu toggle on mobile).

- Add hover/focus/active styles for accessibility.

- Add loading/empty states (e.g., "No todos yet!").

### Optional Enhancements

- Filter by completed/incomplete.

- Edit existing todos.

- Animations for item transitions (e.g., Framer Motion).

- Add tests (unit/integration with Vitest, React Testing Library).
