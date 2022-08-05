import type {GetStaticProps, NextPage} from 'next'
import Product from "../components/Product";
import {gql, GraphQLClient} from "graphql-request";

const Home: NextPage = (data) => {
    const msg = `Hello Aliens! today is your lucky day! We are running a sale on planets and there is only one left which Is Earth! Get it as quick as you can for only $${data.data.products.edges[0].node.priceRange.minVariantPrice.amount.toString().toUpperCase()}`
    console.log(data.data?.products.edges[0].node.variants.edges[0].node.id)
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <main className="max-w-4xl p-10 flex flex-col justify-evenly items-center space-y-10 ">
                <div className="text-2xl text-white text-center font-['jaapokkienchance-regular']">{msg.toUpperCase()}
                </div>
                <Product name={data.data?.products.edges[0].node.title.toUpperCase()}
                         description={data.data?.products.edges[0].node.description.toUpperCase()}
                         image={data.data?.products.edges[0].node.images.edges[0].node.url}
                         variantId={data.data?.products.edges[0].node.variants.edges[0].node.id}
                />
            </main>
        </div>
    )
}
export const getStaticProps: GetStaticProps = async () => {
    const endpoint = process.env.ENDPOINT as string

    const graphQLClient = new GraphQLClient(endpoint)
    graphQLClient.setHeader('X-Shopify-Storefront-Access-Token', process.env.STOREFRONT_ACCESS_KEY as string)

    const query = gql`
        {
            products(first: 1) {
                edges {
                    node {
                        images(first: 1) {
                            edges {
                                node {
                                    url
                                }
                            }
                        }
                        variants(first: 1) {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                        id
                        title
                        description
                        priceRange {
                            minVariantPrice {
                                amount
                            }
                        }
                    }
                }
            }
        }`

    const data = await graphQLClient.request(query)

    return {
        props: {
            data
        }
    }
}
export default Home