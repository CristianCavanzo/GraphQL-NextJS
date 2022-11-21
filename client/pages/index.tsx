import Layout from '@components/Layout/Layout'
import { Card } from 'semantic-ui-react'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import { Avocado, GetAllAvosDocument } from 'service/graphql'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { client } from 'service/client'
import ProductList from '@components/ProductList/ProductList'

export const getStaticProps: GetStaticProps<{ products: Avocado[] }> =
  async () => {
    // const { data, loading } = useQuery(GetAllAvosDocument)
    try {
      const response = await client.query({
        query: GetAllAvosDocument,
      })
      if (response.data.avos === null) {
        throw new Error('Failed to request')
      }

      const products = response.data.avos as Avocado[]

      return {
        props: { products },
      }
    } catch (e) {
      console.log(e)
      return {
        props: {
          products: [],
        },
      }
    }
  }

const HomePage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(products)
  return (
    <Layout title="Home">
      <KawaiiHeader />
      {products.length && <ProductList products={products} />}
      <Card.Group itemsPerRow={2} centered>
        {documentationList.map((doc) => (
          <Card
            key={doc.link}
            href={doc.link}
            header={doc.title}
            meta={doc.meta}
            description={doc.description}
          />
        ))}
      </Card.Group>
    </Layout>
  )
}

const documentationList = [
  {
    title: 'Documentación Proyecto',
    meta: 'Proyecto',
    description:
      '¿Tienes dudas sobre este proyecto? Aquí encuentras la documentación para configurar todo. Aségurate de leerlo.',
    link: 'https://github.com/jonalvarezz/platzi-graphql-fullstack',
  },
  {
    title: 'Documentación Next.js',
    meta: 'Documentación',
    description:
      'Aquí encuentras la documentación sobre el framework base con el que realizaremos todo.',
    link: 'https://nextjs.org/docs/getting-started',
  },
  {
    title: 'Documentación GraphQL',
    meta: 'Documentación',
    description:
      'Nuestra aplicación conecta a Contenful para leer todo el contenido que mostraremos. Contenful provee la capa de GraphQL.',
    link: 'https://graphql.org/learn/',
  },
  {
    title: 'Curso de GraphQL con Node.js',
    meta: 'Proyecto',
    description:
      'Revisa el curso en donde creamos todo el backend y la API para este proyecto.',
    link: 'https://platzi.com/cursos/graphql-nodejs/',
  },
]

export default HomePage
