import { ApolloClient, InMemoryCache } from '@apollo/client'
const url = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'

export const client = new ApolloClient({
  uri: `${url}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          avo: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Avocado',
                id: args?.id,
              })
            },
          },
        },
      },
    },
  }),
})
