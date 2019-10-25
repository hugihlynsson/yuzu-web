import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'

const colors = {
  lemon: '#f8c000',
  ocean: '#2d3a8a',
}

interface HomeData {
  phone: number
  instagram_handle: string
  header_image: { Narrow: {}; Medium: {}; Share: {} }
  city: string
  address: string
  country: string
  text: string
  content_image_top_left: {}
  content_image_right: {}
  content_image_bottom: {}
  footer_text: string
  open_from: string
  open_to: string
  title: string
  description: string
}

interface Props {
  homeData: HomeData
}

const Index: NextPage<Props> = ({ homeData }) => (
  <div>
    <Head>
      <title>{homeData.title}</title>
      <link rel="icon" href="/icon.png"></link>
      <meta name="description" content={homeData.description} />
      <meta property="og:url" content="https://yuzu.is" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={homeData.title} />
      <meta property="og:description" content={homeData.description} />
      <meta property="og:image" content="https://yuzu.is/share.jpg" />
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

    <h1>
      <img
        className="🖼"
        src="/logo.svg"
        alt="Yuzu – Hverfisgata 44, Reykjavík, Iceland"
      />
    </h1>

    <a
      className="📤"
      href={`https://www.instagram.com/${homeData.instagram_handle}/`}
    >
      {homeData.instagram_handle}
    </a>

    <p className="🔜">Opnum fljótt</p>

    <link
      href="https://fonts.googleapis.com/css?family=Raleway:600&display=swap"
      rel="stylesheet"
    />

    <style jsx>{`
      h1 {
        margin: 0;
        border: 4px solid ${colors.lemon};
        margin: 10px;
        background-color: white;
        max-width: 500px;
      }

      .🖼 {
        display: block;
        width: 100%;
        height: auto;
      }

      .📤 {
        position: absolute;
        top: 12px;
        left: 10px;

        text-transform: uppercase;
        color: ${colors.ocean};
        text-decoration: none;
        letter-spacing: 0.15em;
      }

      .🔜 {
        position: absolute;
        top: 12px;
        right: 10px;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.15em;

        color: ${colors.ocean};
      }

      @media (min-width: 500px) {
        .🔜 {
          top: 20px;
          right: 30px;
        }

        .📤 {
          top: 20px;
          left: 30px;
        }
      }
    `}</style>

    <style jsx global>{`
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

        display: flex;
        align-items: center;
        justify-content: center;

        background-image: url('/japanese.png'), url('/background.jpg');
        background-size: 167px 23px, cover;
        background-position: bottom left, center center;
        background-repeat: repeat-x, no-repeat;

        font-family: 'Raleway', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `}</style>
  </div>
)

Index.getInitialProps = async () => {
  const API = await Prismic.getApi('https://yuzu.cdn.prismic.io/api/v2')
  const home = await API.getSingle('home')
  return { homeData: home.data as HomeData }
}

export default Index
