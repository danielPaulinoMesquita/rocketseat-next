import {Client} from 'faunadb';

/*
Its necessary install lib from fauna, that is faunadb
run the following instruction in terminal:
yarn add faunadb
 */
export const fauna = new Client({
    secret: process.env.FAUNA_KEY,
    domain: "db.us.fauna.com",
})