# Microservices

## How to setup the project

- `npm install -g pnpm` - instal pnpm globaly
- `pnpm setup` - set up system configuration for pnpm
- `pnpm install turbo --global` - install turbo globaly
- `pnpm install` - install dependencies
- `pnpm libs:build` - build all libraries

how to setup api-server read in `apps/api/readme.md`

## Run the apps

- `pnpm run web:dev` - run gateway
- `pnpm run web-admin:dev` - run web-admin
- `pnpm run api:dev` - run api server

## Additional commands

- `pnpm install` - install dependencies
- `pnpm add [lib name]` - add a new dependency
- `pnpm add [lib name] --filter [app name]` - add a new dependency to specific app
- `pnpm up -r -i`  - update all dependencies
- `pnpm up -r -i --workspace api` - update dependencies for `api` app
