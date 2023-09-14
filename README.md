# Yeebet Admin FE

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

- Install node Version v18.16

- install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

### For static hosting

```base
npm run generate
```

And then deploy .output/public folder

### For server side rendering

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Recommendations:

### Use VS Code extensions:

1. Vue Language Features (Volar)
2. Tailwind CSS IntelliSense

### Use npm package http-server for testing production locally