import React from 'react'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'
import { client } from 'service/client'
import { Avocado, GetAllAvosDocument, GetOneAvoDocument } from 'service/graphql'

// TODO: Use the graphQL API from https://platzi.com/cursos/nodejs-graphql
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.query({ query: GetAllAvosDocument })
  const data = response.data.avos as Avocado[]
  const paths = data.map(({ id }) => ({ params: { id } }))

  return {
    // Statically generate all paths
    paths,
    // Display 404 for everything else
    fallback: false,
  }
}

// TODO: Use the graphQL API from https://platzi.com/cursos/nodejs-graphql
// This also gets called at build time
export const getStaticProps: GetStaticProps<{ product: Avocado }> = async ({
  params,
}) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const response = await client.query({
    query: GetOneAvoDocument,
    variables: { id: params?.id as string },
  })
  const product = response.data.avo as Avocado
  // Pass post data to the page via props
  return { props: { product } }
}

const ProductPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(product)
  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
