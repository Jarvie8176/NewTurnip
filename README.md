# NewTurnip

[![Build Status](https://travis-ci.com/Jarvie8176/NewTurnip.svg?branch=master)](https://travis-ci.com/Jarvie8176/NewTurnip)
[![codebeat badge](https://codebeat.co/badges/6bdf60c7-abd1-467e-8b89-ab610724a395)](https://codebeat.co/projects/github-com-jarvie8176-newturnip-master)
[![Coverage Status](https://coveralls.io/repos/github/Jarvie8176/NewTurnip/badge.svg)](https://coveralls.io/github/Jarvie8176/NewTurnip)

Turnip price tracker for AC:NH

Production app: https://kabu.wiarlawd.me

API docs: https://kabu.wiarlawd.me/api/docs

# Build & Run

* set up a postgres db, if you don't have one
* create a database
* create uuid extension:
```sql
create extension if not exists "uuid-ossp";
```

* install packages

```shell
yarn install
yarn start:api:dev
yarn start:ui:dev
```

## With Docker
```shell
docker build -t turnip-market .
docker-compose up
```

# Test

```shell
yarn test
```

# Test An Individual Module
```shell
yarn workspace @turnip-market/api test
yarn workspace @turnip-market/ui test
```
