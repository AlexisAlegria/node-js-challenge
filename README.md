# PINFLAG NODE JS CHALLENGE

## Local Installation

1. This backend app was developed with `node.js` version v16+ and jest v27.

2. Clone or download this repository. Once you finish downloading, you will move to new folder

3. Then install the following npm packages:

```sh
npm install express pg pg-hstore sequelize morgan @babel/polyfill

npm install --save-dev @babel/core @babel/cli @babel/preset-env

npm install nodemon -D

npm install @babel/node -D

npm install --save-dev jest

npm install -D jest supertest
```

3. create .env file to set Postgres DB parameters

DATABASE_URI=postgres://postgres:2220@127.0.0.1:5432/pinflag_challenge
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=AlexisAlegriaXXXX
DATABASE_NAME=pinflag_challenge
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432

## How are the endpoints organized?

**localhost:5000/
|**api/v1/
|**api/v1/character (POST endpoint)
|**/listpfcharacters/ (GET endpoint, retrieve N characters)
|\_\_/name (GET endpoint, retrieve character based on "name" parameter)
