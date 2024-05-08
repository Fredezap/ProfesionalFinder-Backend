# Profesional Finder backend

Backend for Profesional Finder application

## Requirements

### Node.js

Use [nvm](https://github.com/nvm-sh/nvm) to install node [lts/iron (v20.x)](https://nodejs.org/en/download/) or greater.

```bash
nvm install lts/iron
nvm use lts/iron
```

### MongoDB

Download [MongoDB v7.0](https://docs.mongodb.com/manual/installation/) or greater.

Alternatively, you can use Docker:

```bash
docker pull mongodb/mongodb-community-server:latest
docker run --name "name" -p 28017:27017 -d mongodb/mongodb-community-server:latest
```

## Installation

Create the following files on the `project root`:

- `.env` for development

Please verify required environment variables at [.env.example](.env.example).

Install packages using [npm](https://www.npmjs.com/):

```bash
npm install
```

## Running

Start server:

```bash
npm start
```

Start server watching for file changes and reloading automatically using [nodemon](https://github.com/remy/nodemon/):

```bash
npm run dev
```

Output:

```json
{ "message": "App listening on port 3000!" }
```

Note: If the server is listening on port 3001 instead of 3000, it might indicate that the environment variables were not properly taken into account. Double-check your configuration to ensure the correct port is being used.

## Tests

## API docs

## License
