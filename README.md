# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Error Handling System

The application includes a comprehensive error handling system:

### Components:

1. **Error Layout** (`layouts/error.vue`):
   - A dedicated layout for error pages
   - Provides consistent branding with simplified navigation

2. **Global Error Page** (`error.vue`):
   - Handles all types of errors (404, 403, 500, etc.)
   - Displays appropriate messages based on error type
   - Uses the error layout

3. **Catch-all 404 Page** (`pages/[...slug].vue`):
   - Catches undefined routes
   - Provides user-friendly navigation

### Usage:

To throw an error from any component or page:

```javascript
// Option 1: Use the composable
const { throwPageError } = useErrorHandling()
throwPageError(403, 'Access denied')

// Option 2: Use Nuxt's built-in function
throw createError({
  statusCode: 500,
  message: 'Internal server error'
})
```

To show an error toast without redirecting:

```javascript
const { showToastError } = useErrorHandling()
showToastError('Operation failed. Please try again.')
```

### API Error Handling:

The `handleApiError` utility simplifies API error management:

```javascript
const { handleApiError } = useErrorHandling()

try {
  // API call
} catch (error) {
  handleApiError(error, { 
    showToast: true,   // Show toast notification
    throwError: false  // Don't redirect to error page
  })
}
```
