# Clicks assignment

## Description

The solution itself is placed inside the `solutions/clicks` folder.

`index.js` is the entry point. The actual code is divided into modules, which are placed in the `modules` folder together with tests.

`data` folder contains the original array. `dist` folder contains the `resultset.json` and is being updated every time we run the solution.

This is a `.git` repository with the commit history. I write commits using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## How to

### Install

Required Node.js version: >= 14 (I use 18.14.0 LTS).

Inside the root folder:

1. `npm install`

### Run

Inside the root folder (Turborepo will be used) or inside the `solutions/clicks` folder:

- `npm run solution` to run the solution
- `npm run test` to run the tests
- `npm run lint` to run ESLint
- `npm run format` to run Prettier (works in the root folder only)

## Packages/technologies used and why

### [Turborepo](https://turbo.build/repo)

- Runs things really fast thanks to caching
- Enables sharing between apps

Thanks to Turborepo we are able to include several more apps, if such need arises, and share configs, packages, components/modules between all of them, if needed.

### [Vitest](https://vitest.dev/)

Vitest positions itself as modern Jest, having a lot of useful features included and setup by default. It works well, has great documentation and is a drop-in replacement for Jest.

### [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)

Formatting tools, which help keep the code clean and consistent in its style.

### [Husky](https://typicode.github.io/husky/#/)

A Git Hooks tool, which helps us run pre-commit scripts like `lint`, `format` and `test` before commiting anything, thus improving code quality.

### [date-fns](https://date-fns.org/)

As far as I know this is the best `Date` library: tiny, modular, simple, efficient.
