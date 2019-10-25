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
  header_image: {
    alt?: string
    dimensions: { width: number; height: number }
    url: string
    Narrow: {
      alt?: string
      dimensions: { width: number; height: number }
      url: string
    }
    Medium: {
      alt?: string
      dimensions: { width: number; height: number }
      url: string
    }
    Share: {
      alt?: string
      dimensions: { width: number; height: number }
      url: string
    }
  }
  city: string
  address: string
  country: string
  text: string
  content_image_top_left: {
    alt?: string
    dimensions: { width: number; height: number }
    url: string
  }
  content_image_right: {
    alt?: string
    dimensions: { width: number; height: number }
    url: string
  }
  content_image_bottom: {
    alt?: string
    dimensions: { width: number; height: number }
    url: string
  }
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
  <>
    <Head>
      <title>{homeData.title}</title>
      <link rel="icon" href="/icon.png"></link>
      <meta name="description" content={homeData.description} />
      <meta property="og:url" content="https://yuzu.is" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={homeData.title} />
      <meta property="og:description" content={homeData.description} />
      <meta property="og:image" content={homeData.header_image.Share.url} />
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

    <div className="hero">
      <div className="top">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.instagram.com/${homeData.instagram_handle}/`}
        >
          @{homeData.instagram_handle}
        </a>

        <a href={`tel:${homeData.phone}`}>
          s. {homeData.phone.toString().substring(0, 3)}{' '}
          {homeData.phone.toString().substring(3, 7)}
        </a>
      </div>

      <picture className="hero-image">
        <img
          src={homeData.header_image.url}
          alt={homeData.header_image.alt || ''}
        />
      </picture>

      <header>
        <h1>
          <img
            className="logo"
            src="/logo.svg"
            alt="Yuzu – Hverfisgata 44, Reykjavík, Ísland"
          />
        </h1>
      </header>
    </div>

    <section className="about">
      <img
        className="about-image"
        src="/glass.svg"
        alt="Japönsk OK-hendi með drykk"
        width="216"
        height="324"
      />
      <p className="about-text">{homeData.description}</p>
    </section>

    <style jsx>{`
      .hero {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 90%;
        padding-bottom: 40px;
        position: relative;
      }

      .hero-image img {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .top {
        display: flex;
        flex-grow: 0;
        flex-shrink: 0;
        justify-content: space-between;
        padding: 12px;
      }
      .top a {
        color: white;
        font-size: 11px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        text-decoration: none;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
      }

      header {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
      }

      h1 {
        border: 4px solid ${colors.lemon};
        margin: 10px;
        background-color: white;
        max-width: 500px;
      }

      .logo {
        display: block;
        width: 100%;
        height: auto;
      }

      .about {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 35px;
      }

      .about-text {
        padding: 36px;
        color: ${colors.ocean};
        font-family: 'Shinra';
        font-size: 28px;
        text-align: center;
        line-height: 1.3;
      }

      @media (min-width: 600px) {
        .top {
          margin: 20px 30px;
        }
        .top a {
          font-size: 14px;
        }
        .about-text {
          font-size: 33px;
          margin: 0;
        }
      }

      @media (min-width: 800px) {
        .about {
          flex-direction: row;
          max-width: 900px;
          margin: 0 auto;
          padding: 90px 0;
        }
        .about-image {
          flex-basis: 50%;
        }
        .about-text {
          flex-basis: 50%;
        }
      }
    `}</style>

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

Index.getInitialProps = async () => {
  const API = await Prismic.getApi('https://yuzu.cdn.prismic.io/api/v2')
  const home = await API.getSingle('home')
  return { homeData: home.data as HomeData }
}

export default Index
