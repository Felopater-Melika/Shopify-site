import React from 'react';
import {motion} from "framer-motion";
import Image from "next/image";
import {gql, GraphQLClient} from "graphql-request";
import {useRouter} from 'next/router'

type ProductProps = {
    name: string;
    image: any;
    description: string;
    variantId: any;
}

function Product({name, image, description, variantId}: ProductProps) {
    const router = useRouter()
    console.log(variantId)
    const checkoutHandler = async () => {
        const endpoint = process.env.ENDPOINT as string

        const graphQLClient = new GraphQLClient(endpoint)
        graphQLClient.setHeader('X-Shopify-Storefront-Access-Token', process.env.STOREFRONT_ACCESS_KEY as string)

        const query = gql`
            mutation CheckoutCreate($variantId: ID!){
                checkoutCreate(input: {
                    lineItems: [{ variantId: $variantId , quantity: 1 }]
                }) {
                    checkout {
                        id
                        webUrl
                        lineItems(first: 1) {
                            edges {
                                node {
                                    title
                                    quantity
                                }
                            }
                        }
                    }
                }
            }

        `

        graphQLClient.request(query, {variantId}).then(response => router.push(response.checkoutCreate.checkout.webUrl)).catch((error) => console.log(error))
    }
    return (
        <motion.div className="backdrop-blur h-42 w-60 rounded-3xl p-3 border-4 border-white shadow-inner shadow-white flex flex-col justify-evenly items-center space-y-2 "
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1}}>
            <Image src={image}
                   className="rounded-2xl"
                   height="300"
                   width="300"/>
            <div className="flex justify-between flex-col text-center">
                <div className="text-2xl text-white font-['jaapokkienchance-regular']">{name}</div>
                <div className="text-lg text-white font-['jaapokkienchance-regular'] ">{description}</div>
            </div>
            <button className="text-3xl w-36 text-white rounded-3xl p-3 border-4 border-white font-['jaapokkienchance-regular'] shadow-white shadow-inner"
                    onClick={checkoutHandler}>BUY
            </button>
        </motion.div>
    );
}

export default Product;