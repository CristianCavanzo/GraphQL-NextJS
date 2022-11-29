import { Segment, Header, Button } from 'semantic-ui-react'

import { removeToken } from '@service/auth'
import type { User } from '@service/auth'
import Layout from '@components/Layout/Layout'
import { AddAvocadoDocument } from '@service/graphql'
import { useMutation } from '@apollo/client'

function Profile({ user }: { user: User }) {
  const [addAvocado, { data, loading }] = useMutation(AddAvocadoDocument)

  const createAvo = () => {
    console.log('cargando')
    addAvocado({
      variables: {
        data: {
          name: 'Zutano Avocado 2',
          sku: 'MW79asdasZZ6Y',
          description:
            'The Zutano avocado is a cold hardy, consistent producing avocado variety. It resembles the Fuerte in appearance but is less flavorful but more cold hardy. The green fruits are obovate in shape with waxy bumps on the skin. The flesh has a low oil but high water content which causes it to have a more fibrous texture.',
          hardiness: '-5 °C',
          taste: 'Splendid, is an avocado',
          shape: 'Pear',
          image: '/static/zutano.jpg',
          price: 1.23,
        },
      },
    })
  }
  console.log({ data, loading })

  const logout = async () => {
    await removeToken()
    window.location.reload()
  }

  return (
    <Layout title="Hola">
      <div className="mt-14" />
      <Header as="h2" size="huge" className="">
        Hola, {user.username}
      </Header>
      <Segment>
        <p>
          Si estás viendo esto es porque has iniciado sesión de forma correcta.
        </p>
        <Button type="button" positive onClick={createAvo}>
          Agregar nuevo avocado...
        </Button>{' '}
        <Button type="button" basic color="red" onClick={logout}>
          Logout
        </Button>
      </Segment>
      <div className="mb-20" />
    </Layout>
  )
}

export default Profile
