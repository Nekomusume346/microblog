import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { useRouter } from 'next/router' //iframely


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
      <Layout>
        {/* <Component {...pageProps} /> */}
        <Component key={router.asPath} {...pageProps} />
      </Layout>
  )
}


