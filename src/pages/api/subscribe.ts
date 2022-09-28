import {NextApiRequest, NextApiResponse} from "next";
import {stripe} from "../../services/stripe";
import {getSession} from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        // pegando o session (para então conseguir pegar os cookies.)
        const session = await getSession({req});


        // é necessário primeiro criar um cliente(customer) no stripe
        // vai ser criado com email.
        const stripCustomer = await stripe.customers.create({
            email:session.user.email,
        })

        // O customer que vai no checkout é o cliente que foi salvo anteriormente
        const stripeCheckSession = await stripe.checkout.sessions.create(
            {
                customer: stripCustomer.id,
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                line_items:[
                    {
                        price: 'price_1LDK6CLV7JLpWAxBkuy6IMfH', quantity: 1
                    }
                ],
                mode: 'subscription',
                allow_promotion_codes: true,
                success_url: process.env.STRIPE_SUCCESS_URL,
                cancel_url: process.env.STRIPE_CANCEL_URL
            }
        )

        return res.status(200).json({sessionId: stripeCheckSession.id})
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}