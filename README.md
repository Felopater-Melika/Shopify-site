This is just a fun project I built to play around with GraphQL and shopify
and headless CMS in general.

The way it works is through fetching everything on load through
getServerSideProps and then passing it to a product component and for
Checkout it's a basic mutation function that uses the variant id passed down
as props and then using next router to push the user to checkout.