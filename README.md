#### This is react-starter
webpack4 + react 16.8.6 + fetch(redux middleware)

#### Project Structure

```
.
├── public                   # Static public assets (not imported anywhere in source code)
│   ├── index.html           # Main HTML page container for app
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── components           # Global Reusable Components
│   ├── containers           # Global Reusable Container Components
│   ├── layout               # Components that dictate major page structure
│   ├── middleware           # Middleware for Redux
│   │   ├── fetch            # Fetch middleware
│   ├── routes               # Main route definitions and async split points
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   └── Index            # Fractal route
│   │       ├── index.js     # Index route definition
│   │   └── PageNotFound     # Fractal route
│   │       ├── index.js     # PageNotFound route definition
│   │   ├── index.js         # Bootstrap main application routes with store
│   ├── store                # Redux-specific pieces
│   │   ├── index.js         # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection(generally settings)
└── tests                    # Unit tests
```
