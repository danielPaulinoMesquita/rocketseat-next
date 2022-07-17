import {NextApiRequest, NextApiResponse} from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {id: 1, name:'Diego'},
        {id: 2, name:'Rafaela'},
        {id: 3, name:'Fela'},
    ]

    return response.json(users);
}