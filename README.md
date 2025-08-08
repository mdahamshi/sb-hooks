# @sarawebs/sb-hooks

A collection of reusable React hooks for building modern, maintainable applications.  
Currently includes:

- **`useCrud`** – A simple CRUD hook for API interaction.
- **`useTheme`** – A lightweight theme toggler with `light` / `dark` support.

---

## 📦 Installation

```bash
npm install @sarawebs/sb-hooks
```

---

## 🚀 Hooks

### 1. `useCrud(apiUrl)`

A reusable hook for fetching, creating, updating, and deleting data from an API.

#### **Usage Example**

```jsx
import React, { useEffect } from "react";
import { useCrud } from "@sarawebs/sb-hooks";

export default function BookList() {
  const { data, loading, error, load, create, update, remove } =
    useCrud("/api/v1/books");

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data.map((book) => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => remove(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### **Returned Values**

| Name      | Type       | Description                        |
| --------- | ---------- | ---------------------------------- |
| `data`    | `Array`    | List of items fetched from the API |
| `item`    | `Object`   | Single item fetched by ID          |
| `loading` | `boolean`  | Loading state                      |
| `error`   | `string`   | Error message                      |
| `load`    | `function` | Fetch all items                    |
| `loadOne` | `function` | Fetch one item by ID               |
| `create`  | `function` | Create a new item                  |
| `update`  | `function` | Update an existing item            |
| `remove`  | `function` | Delete an item                     |

---

### 2. `useTheme(defaultTheme = 'light')`

A minimal hook to toggle between **light** and **dark** mode, with persistence in `localStorage`.

#### **Usage Example**

```jsx
import React from "react";
import { useTheme } from "@sarawebs/sb-hooks";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}
```

#### **Returned Values**

| Name          | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| `theme`       | `string`   | Current theme (`light` or `dark`)    |
| `setTheme`    | `function` | Manually set theme                   |
| `toggleTheme` | `function` | Toggle between light and dark themes |

---



### 3. `useRandomPrimaryColor(palette?)`

A hook that sets a random CSS `--primary` color on the document root when your app loads.
You can optionally pass a custom color palette array.

#### **Usage Example**

```jsx
import React from 'react';
import { useRandomPrimaryColor } from '@sarawebs/sb-hooks';

const customPalette = ['#ff0000', '#00ff00', '#0000ff'];

export default function App() {
  // Use default palette if no argument passed
  useRandomPrimaryColor(customPalette);

  return (
    <div>
      <h1 style={{ color: 'var(--primary)' }}>Hello with random primary color!</h1>
    </div>
  );
}
```



## 📝 License

MIT © 2025 [Mohammad Dahamsheh](https://github.com/mdahamshi)
