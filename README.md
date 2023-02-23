# Description

Backend server of [Sunrin Internet High School Information Security Department page](https://sunrinsecurity.com).
Project based on Lerna and Nest.js.

# Bootstrap

## Dependency Installation

```
yarn global add lerna
lerna bootstrap
```

## Build

```
lerna run build
```

# Start

## Production mode

```
lerna exec --scope=server yarn -- start
```

## Development mode

```
lerna exec --scope=server yarn -- start:dev
```

# Docs

Before, Run the server in development mode<br>
http://localhost:3000/document
