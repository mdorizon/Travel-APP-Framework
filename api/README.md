# Travel API

[![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logocolor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

# Requirements

- You need to install Docker an Docker Compose on your machine. Follow link to [Download](https://docs.docker.com/get-docker/) and install docker
- You need to install Node.js on your machine. [Download](https://nodejs.org/en/download/) and install node

## Run project

```bash
# start containers
docker-compose up -d

# install dependencies
npm install

# Start server
npm run dev
```
## Schemas BDD

| Table Travel |  |
|------------|--|
| id | int [primary key] [auto_increment] |
| title | varchar(255) |
| city | varchar(255) |
| country | varchar(255) |
| image | varchar(255) |
| description | varchar(255) |

| Table Category |  |
|---------------|--|
| id | int [primary key] [auto_increment] |
| name | varchar(255) |
| description | varchar(255) |
