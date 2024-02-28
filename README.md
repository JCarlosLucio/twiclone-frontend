# 🌪️ Twiclone Frontend

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D%2016.0-blue.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/JCarlosLucio/twiclone-frontend#readme)

> The frontend for Twiclone (a Twitter clone).  
> The backend can be found
> [here](https://github.com/JCarlosLucio/twiclone-backend).

## ✨ Demo

[![TWICLONE Homepage](../media/twiclone-desktop.webp?raw=true)](https://twiclone.pages.dev/)

## 📜 Docs

To run add a `.env` file with the environment variables from `.env.example`.  
Also make sure
[twiclone's server](https://github.com/JCarlosLucio/twiclone-backend) is
running.

### Prerequisites

- node >= 16.0

### Install

```sh
npm install
```

### Build

Builds the app for production to the `dist` folder.

```sh
npm run build
```

### Develop

Runs the app in development mode. Opens
[http://localhost:5173/](http://localhost:5173/) to view it in the browser.

```sh
npm run dev
```

### Preview

Locally preview the production build. Open
[http://localhost:3000/](http://localhost:3000/) to view it in the browser.

```sh
npm run preview
```

### Lint

Runs eslint to fix linting errors.

```sh
npm run lint
```

### Format

Format the application with prettier.

```sh
npm run format
```

## 🚀 Deployment

Deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

1. `Connect to Git` in **Cloudflare Dashboard > Workers & Pages > Pages**.
2. Pick your `Git` hosting service. ex. GitHub / Gitlab.
3. Select your repository.
4. Select the corresponding framework preset in the build setting.
5. Deploy site.
6. Add `environment variables` from `.env.example` in **Settings**.
7. Setup a Custom domain in **Custom domains**.

[More on deployment to Cloudflare Pages...](https://vitejs.dev/guide/static-deploy.html#cloudflare-pages)

### Triggering a Deploy

Deploys are triggered on `push` or `pull_request` merge to `master` branch.

## 📖 Lessons Learned

- Setting up services to consume Twiclone's API with
  [Axios](https://axios-http.com/).
- Using [React Query](https://tanstack.com/query/latest) for asynchronous state
  management.
- Styling and Theming the application with [MUI](https://mui.com/).
- Adding dark mode using [MUI](https://mui.com/), and
  [ContextAPI](https://react.dev/learn/passing-data-deeply-with-context).
- Migrating from [CRA](https://create-react-app.dev/) to
  [Vite](https://vitejs.dev/).
- Setting up the app to be a [PWA](https://web.dev/progressive-web-apps/) with
  [VitePWA](https://github.com/vite-pwa/vite-plugin-pwa).

## ✏️ TODO

- ~~Deploy to [Cloudflare Pages](https://pages.cloudflare.com/)
  /[GitHub Pages](https://pages.github.com/).~~
- ~~Migrate deployment from [Netlify](https://www.netlify.com/) to
  [Cloudflare Pages](https://pages.cloudflare.com/)~~
- ~~Upgrade to the latest
  [@tanstack/react-query](https://tanstack.com/query/latest/docs/react/overview)
  package.~~
- Add e2e tests with [Playwright](https://playwright.dev/) or
  [Cypress](https://www.cypress.io/).
- Migrate to [Typescript](https://www.typescriptlang.org/).

## Author

👤 **Juan Carlos Lucio**

- Github: [@JCarlosLucio](https://github.com/JCarlosLucio)
