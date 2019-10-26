import App from 'next/app'
import Head from 'next/head'

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-143527780-1"
          />
          <meta
            name="google-site-verification"
            content="WzEGIhEyyeghGzMuX_-qjuwRQh9HoC8qmAbCFZhTGv4"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-143527780-1');
          `,
            }}
          />
        </Head>

        <Component {...pageProps} />

        <script
          async
          defer
          src="//static.cdn.prismic.io/prismic.js?repo=yuzu&new=true"
        />

        <style jsx global>{`
          @font-face {
            font-family: 'Sackers Gothic';
            src: url('/fonts/Sackers-Gothic-Std-Heavy.woff2') format('woff2'),
              url('/fonts/Sackers-Gothic-Std-Heavy.woff') format('woff');
          }

          @font-face {
            font-family: 'Shinra';
            src: url('/fonts/Shinra-Regular.woff2') format('woff2'),
              url('/fonts/Shinra-Regular.woff') format('woff');
          }

          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }

          html {
            height: 100%;
          }

          body {
            width: 100vw;
            height: 100%;
            margin: 0;

            font-family: 'Sackers Gothic', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          #__next {
            height: 100%;
          }
        `}</style>
      </>
    )
  }
}
