import React from 'react'
import { Card } from 'semantic-ui-react'
import Link from 'next/link'
import Image from 'next/image'
import { Avocado } from 'service/graphql'

const mapProductsToCards = (products: Avocado[]) =>
  products.map(({ name, id, price, image }) => (
    <Link key={id} href={`/product/${id}`} passHref>
      <Card
        as="a"
        header={name}
        image={{
          children: (
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVICE_URL}${image}`}
              width={333}
              height={333}
            />
          ),
        }}
        meta={{
          children: <Card.Meta style={{ color: 'dimgray' }}>{price}</Card.Meta>,
        }}
      />
    </Link>
  ))

interface Props {
  products: Avocado[]
}

const ProductList = ({ products }: Props) => (
  <Card.Group itemsPerRow={2} stackable>
    {mapProductsToCards(products)}
  </Card.Group>
)

export default ProductList
