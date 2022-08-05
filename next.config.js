/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: ['cdn.shopify.com']
    },
    reactStrictMode: true,
    env: {
        SHOP: 'https://astral99.myshopify.com',
        API_KEY: '206b30652912dc1807c7bbab4d021f94',
        API_SECRET_KEY: 'ee0b370a0177a804b14c3d4f531aac2e',
        STOREFRONT_ACCESS_KEY: 'c91e1675b37665da2d5a359e1c1be35c',
        ENDPOINT: 'https://astral99.myshopify.com/api/2022-07/graphql.json'
    }
}