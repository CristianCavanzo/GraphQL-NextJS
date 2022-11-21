import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'
import CartProvider from '@store/Cart'
import { client } from 'service/client'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ApolloProvider>
  )
}

export default MyApp
