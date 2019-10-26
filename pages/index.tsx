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

      <picture>
        <source
          className="hero-image"
          media="(max-aspect-ratio: 1/1)"
          srcSet={homeData.header_image.Narrow.url}
        />
        <img
          className="hero-image"
          sizes="100vw"
          srcSet={`${homeData.header_image.url} ${homeData.header_image.dimensions.width}w, ${homeData.header_image.Medium.url} ${homeData.header_image.Medium.dimensions.width}w`}
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

    <section className="menu">
      <img className="menu-image" src="/menu.png" alt="Matseðill" />
    </section>

    <section className="gallery">
      <img
        className="galleri-kanjiYuzu"
        src="/kanji-yuzu.svg"
        alt="Yuzu á Japönsku"
      />
      <div className="gallery-images">
        <img
          className="galleri-topLeft"
          src={homeData.content_image_top_left.url}
          alt={homeData.content_image_top_left.alt}
        />
        <img
          className="galleri-right"
          src={homeData.content_image_right.url}
          alt={homeData.content_image_right.alt}
        />
        <img
          className="galleri-bottom"
          src={homeData.content_image_bottom.url}
          alt={homeData.content_image_bottom.alt}
        />
      </div>
      <img
        className="galleri-kanjiBurgers"
        src="/kanji-burgers.svg"
        alt="Borgarar á Japönsku"
      />
    </section>

    <footer>
      <p className="footer-text">{homeData.footer_text}</p>
      <div className="footer-info">
        <p className="footer-info-item">
          Opið: {homeData.open_from}–{homeData.open_to}
        </p>

        <a className="footer-info-item" href={`tel:${homeData.phone}`}>
          s. {homeData.phone.toString().substring(0, 3)}{' '}
          {homeData.phone.toString().substring(3, 7)}
        </a>
      </div>
    </footer>

    <style jsx>{`
      .hero {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 90%;
        padding-bottom: 40px;
        position: relative;
      }

      .hero-image {
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

      .menu {
        padding: 25px;
        margin: calc(20% + 60px) 0;
        background-color: ${colors.lemon};
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .menu-image {
        margin: -20% 0;
        width: 100%;
        height: auto;
        max-width: 850px;
      }

      .gallery {
        padding: 25px 25px 70px;
        position: relative;
        max-width: 800px;
        margin: 0 auto;
      }
      .galleri-kanjiYuzu {
        position: absolute;
        right: 50px;
        top: 0;
      }
      .gallery-images {
        display: flex;
        flex-direction: column;
        max-width: 540px;
        margin: 0 auto;
      }
      .galleri-topLeft {
        width: 60%;
        max-width: 328px;
        height: auto;
      }
      .galleri-right {
        width: 50%;
        max-width: 243px;
        height: auto;
        align-self: flex-end;
        margin-top: -20%;
      }
      .galleri-bottom {
        width: 40%;
        width: 221px;
        height: auto;
        margin-top: -30%;
        align-self: center;
        margin-right: 20%;
      }
      .galleri-kanjiBurgers {
        position: absolute;
        left: 20px;
        bottom: 0;
      }

      footer {
        padding-bottom: 45px;
      }
      .footer-text {
        color: ${colors.ocean};
        text-align: center;
        font-family: 'Shinra';
        font-size: 40px;
        margin-bottom: 0.8em;
        margin-top: 2em;
        text-transform: uppercase;
      }
      .footer-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .footer-info-item {
        color: ${colors.ocean};
        font-size: 14px;
        text-transform: uppercase;
        text-decoration: none;
        margin: 6px 0;
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
        .footer-text {
          font-size: 50px;
        }
        .footer-info {
          flex-direction: row;
          max-width: 500px;
          margin: 0 auto;
        }
        .footer-info-item {
          flex-basis: 50%;
          text-align: center;
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
        .galleri-kanjiYuzu {
          left: 10px;
          top: 30%;
          right: auto;
        }
        .galleri-kanjiBurgers {
          bottom: 30%;
          right: 10px;
          left: auto;
        }
        footer {
          padding-bottom: 95px;
        }
        .footer-text {
          font-size: 83px;
        }
        .footer-info-item {
          font-size: 19px;
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
