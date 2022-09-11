import {NextApiRequest, NextApiResponse} from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query);
    // como arquivo tem o id escrito, ele vai pegar o
    // valor atribuido a ele na url: example:
    // /user/12

    const users = [
        {id: 1, name:'Diego'},
        {id: 2, name:'Rafaela'},
        {id: 3, name:'Fela'},
    ]

    return response.json(users);
}