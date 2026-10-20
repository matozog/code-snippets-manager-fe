# Snippets manager application

Application to store and manage code snippets. The destination can be different but mainly it is written for developers. Link to application: https://matozog.github.io/code-snippets-manager-fe/

## Current status

| Stage                               | Status               |
| ----------------------------------- | -------------------- |
| First deployment client application | :heavy_check_mark:   |
| Integration with BE                 | :heavy_check_mark:\* |
| Integration with VSC                | :x:                  |

Integration with BE and database partly is ready. Web service is running on render platform: https://render.com/. It is running on unpaid server version so after some time inactivity it is suspended. First request to API impact service restart and after some time it is up.

## Configuration

The API address is set by `VITE_API_URL`: `.env.development` (used by `npm start`) points to the local backend,
`.env.production` (used by `npm run build` / `npm run deploy`) to the service on Render.
To use a different address locally, create an untracked `.env.local` file with `VITE_API_URL=...`.

## Sign in with Google

The application is available only to signed-in users. Set `VITE_GOOGLE_CLIENT_ID` in `.env.development` and
`.env.production` to the OAuth client id from Google Cloud Console (the same value as `GOOGLE_CLIENT_ID` of the API;
it is public). The Google ID token is kept in `localStorage` until it expires (one hour), then the user signs in again.

## Git hooks

`npm install` sets up Husky; the pre-commit hook runs ESLint and Prettier on staged files (lint-staged).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode (Vite).\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run lint`

Runs ESLint on the sources.

### `npm test`

Launches the test runner (Vitest) in the interactive watch mode. Use `npm test -- --run` for a single run.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

This script builds the application and deploys it on GitHub Pages. It automatically pushes the `build` directory to the `gh-pages` branch.

Usually it is not needed: every push (merge) to `master` runs the CI workflow (`.github/workflows/ci.yml`), which lints,
tests and builds the app and then publishes the same bundle to `gh-pages`. Pull requests and `develop` are only tested.
