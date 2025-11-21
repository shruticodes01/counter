# Introduction

This a small practice project for learning React from Udemy course by Maximilian Schwarzmüller.
The project is integrated with TypeScript and TailwindCSS.

In this project the user has an option to set an initial value of choice for the counter or else the initial value is 0.
Once the value is set there is an option to either increase or decrease the counter value by 1.
We also display a list as a history of counter changes.

## Table of Contents

- [React + TypeScript + Vite](#react--typescript--vite)
  - [React Compiler](#react-compiler)
  - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
- [Project Learnings](#project-learnings)
  - [React API memo()](#react-api-memo)
    - [Best way to prevent component functions from unnecessary executions](#best-way-to-prevent-component-functions-from-unnecessary-executions)
    - [When memo() does not work?](#when-memo-does-not-work)
  - [useCallback() hook and memo() API](#usecallback-hook-and-memo-api)
  - [useMemo() hook](#usememo-hook)
  - [useState() hook](#usestate-hook)
    - [Why initial value in useState() is not responsive to prop changes?](#why-initial-value-in-usestate-is-not-responsive-to-prop-changes)
    - [Using useEffect() hook for syncing state with props or external changes](#using-useeffect-hook-for-syncing-state-with-props-or-external-changes)
    - [Problems of using useEffect() hook for syncing state with props or external changes](#problems-of-using-useeffect-hook-for-syncing-state-with-props-or-external-changes)
    - [Updating local state whenever prop or external value changes without useEffect() hook](#updating-local-state-whenever-prop-or-external-value-changes-without-useeffect-hook)
  - [Problems of using Index as a key value](#problems-of-using-index-as-a-key-value)

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Project Learnings

### React API memo()

- memo prevents the component functions from executing unnecessarily.
- If the component function were to execute, memo checks the prop values and compares the old prop value with the new prop value,and if they are same array/objects in memory, memo prevents its execution.
  The component function will execute only if the prop value is different in memory or if the component's internal state changes.
- memo should be used on components that are higher up in the tree, as blocking its executions will also block execution of all its child components.
- memo should not be used to wrap around all your components because React would have to check props for each component. This would lead to unnecessary checks and cost performance. Therefore, it should only be used on components where you can actually prevent re-renders.
- memo should not be used on components where props will change frequently. This will make memo perform meaningless checks resulting in bad performance.

#### Best way to prevent component functions from unnecessary executions

- Component compositions is the best way to avoid re-executions.
- Creating a separate component function, updating its states internally, and then lifting the state if necessary to propagate required information to the App component is the basic way to avoid unnecessary re-renders.
- Because state changes and re-executions of child components don't trigger parent component executions.

#### When memo does not work?

- Based on this project wrapping Button with memo does not have an effect because of its onClick event handler
- These event handler functions are nested functions and will be executed each time the Component function in which they are nested executes. Because upon each execution of the Component function, JavaScript creates a new Object in memory, which results in creating a new prop value for the Button component, even though its prop value is technically the exact same function value.

```ts
function handleDecrement() {
  setCounter((prevCounter) => prevCounter - 1);
}

function handleIncrement() {
  setCounter((prevCounter) => prevCounter + 1);
}
```

- Recreation of this function object upon each execution can be prevented by using React's useCallback() hook.

### useCallback() hook and memo() API

- useCallback() hook is used to avoid recreation of a function.
- useCallback() hook takes 2 arguments, first is the function value whose recreation you want to avoid, second is the dependancies array, where you would list all the props/context values that is used inside the function.
- A new function is created only if the values inside dependancy array changes to use the latest value in that function.
- It is sometimes needed in conjunction with the useEffect() hook if it has a function as a dependency.
- It is also needed in conjunction with memo to avoid unnecessary executions.

Example:
memo() API wrapped around the Button component function together with the useCallback() hook on the event handler functions nested inside Counter component, will prevent unnecessary re-executions of the Button component function

```ts
const Button = memo(function Button({
  children,
  variant = "primary",
  label,
  icon,
  className,
  onClick,
  ...props
}: ButtonProps) {
  log("<Button/> rendered", 2);

  const base =
    "inline-flex items-center justify-center gap-2 py-2 px-4 text-center border-none text-base cursor-pointer";

  const variantClasses = {
    primary:
      "bg-electric-cyan text-shade-black-200 rounded-sm transition-colors duration-[0.3s] ease-in",
    text: "bg-transparent text-dull-light-cyan hover:text-electric-cyan",
    icon: "bg-electric-cyan text-shade-black-200",
  };
  const Icon = icon;

  return (
    <button
      className={`${base} ${variant !== "icon"} ${
        variantClasses[variant]
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
      {Icon ? <Icon /> : null}
      {label}
    </button>
  );
});

export default Button;
```

```ts
const handleCounterIncrement = useCallback(function handleCounterIncrement() {
  setCounter((prevCounter) => prevCounter + 1);
}, []);

const handleCounterDecrement = useCallback(function handleCounterDecrement() {
  setCounter((prevCounter) => prevCounter - 1);
}, []);
```

### useMemo() hook

- useMemo() hook is used to prevent re-executions of normal functions nested inside Component functions.
- useMemo() should really be only used if you have complex calculation you want to prevent from unnecessary re-executions.

### useState() hook

- State updates are scheduled by React
- Since the state updates are not executed instantly, if we console.log right after updating it will log the old state value and not the new one.
- And because those state updates are scheduled, it is considered a best practice to perform state updates that depend on the old state value using a function form.

```ts
setCounter((prevCounter) => prevCounter - 1);
```

- By using this approach React guarantees that you will always get the latest state snapshot available and if multiple state updates are to be scheduled at the same time, they will be executed in the order in which they were scheduled.
- Importantly, if multiple state updates are triggered simultaneously in the same function, you will not end up with multiple component function executions. The component function will execute only once because React performs something called, state batching.
- State batching simply means that multiple state updates that are triggered from the same function, are batched together and will only lead to one component function execution.

#### Why initial value in useState is not responsive to prop changes?

- The initial state argument is not reactive — it’s evaluated only once.
- Any dynamic or changing values passed as initialValue will be ignored after the initial render. This is by design to avoid resetting state unexpectedly on every render.

#### Using useEffect() hook for syncing state with props or external changes

- To update local state whenever a prop or any external value changes, useEffect() listens for changes and calls the state setter:

```ts
const [counter, setCounter] = useState(initialCount);

useEffect(() => {
  setCounter(initialCount);
}, [initialCount]);
```

- This triggers an update after the render when the prop/variable changes, ensuring state stays in sync.

#### Problems of using useEffect() hook for syncing state with props or external changes

- The function inside useEffect() hook runs after the execution of the Component function, and if we change the state in that function it triggers another execution of the component function.
- Meaning, the component function executes twice instead of once, making it inefficient/suboptimal.

#### Updating local state whenever prop or external value changes without useEffect() hook

- Better way of forcing component functional reset is to use key on the component function.

```ts
<Counter key={chosenInitialValue} initialValue={chosenInitialValue} />
```

- Adding the same value for the key as the prop value works when adding it to only one component function. Otherwise you get an error.
- But with this approach whenever the key value changes, the chosen initalCount state value changes, which results in React destroying the old component instance, and recreating a new one as if it was rendering the Counter component for the first time.
- Therefore by using this approach we avoid extra component function execution because now the old component is simply removed
  and a new component of the same type is re-inserted, and then executed by React. Therefore, it is executed only once.

### Problems of using Index as a key value

- Index is not strictly mapped to a specific value. So, even if the value changes index remains the same.
- Therefore, in situations where we want to map an id to a specific value, we should generate the id value.

```ts
const [counterChanges, setCounterChanges] = useState([
  { value: initialValue, id: Math.random() * 1000 },
]);

const currentCounter = counterChanges.reduce(
  (prevCounter, counterChange) => prevCounter + counterChange.value,
  0
);

const handleCounterIncrement = useCallback(function handleCounterIncrement() {
  setCounterChanges((prevCounterChanges) => {
    return [{ value: 1, id: Math.random() * 1000 }, ...prevCounterChanges];
  });
}, []);

const handleCounterDecrement = useCallback(function handleCounterDecrement() {
  setCounterChanges((prevCounterChanges) => [
    { value: -1, id: Math.random() * 1000 },
    ...prevCounterChanges,
  ]);
}, []);
```
