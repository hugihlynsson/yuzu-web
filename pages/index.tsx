import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'

const colors = {
  lemon: '#f8c000',
  ocean: '#2d3a8a',
}

interface PrismicImage {
  alt?: string
  dimensions: { width: number; height: number }
  url: string
}

interface HomeData {
  open: string
  phone: number
  instagram_handle: string
  header_image: PrismicImage & {
    Narrow: PrismicImage
    Medium: PrismicImage
    Small: PrismicImage
    Share: PrismicImage
  }
  city: string
  address: string
  country: string
  text: string
  content_image_top_left: PrismicImage & {
    Small: PrismicImage
  }
  content_image_right: PrismicImage & {
    Small: PrismicImage
  }
  content_image_bottom: PrismicImage & {
    Small: PrismicImage
  }
  footer_text: string
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
    </Head>

    <div className="hero">
      <div className="top">
        <a
          className="top-item"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.instagram.com/${homeData.instagram_handle}/`}
        >
          @{homeData.instagram_handle}
        </a>

        <p className="top-item top-item--rightAlign">{homeData.open}</p>
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
          srcSet={`${homeData.header_image.url} ${homeData.header_image.dimensions.width}w, ${homeData.header_image.Medium.url} ${homeData.header_image.Medium.dimensions.width}w, ${homeData.header_image.Small.url} ${homeData.header_image.Small.dimensions.width}w`}
          src={homeData.header_image.url}
          alt={homeData.header_image.alt || ''}
        />
      </picture>

      <header>
        <h1 className="header-title">
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
        className="about-item about-image"
        src="/about-illustration.svg"
        alt="Japönsk OK-hendi með drykk"
        width="216"
        height="324"
      />
      <p className="about-item about-text">{homeData.text}</p>
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
          sizes="328w"
          srcSet={`${homeData.content_image_top_left.url} ${homeData.content_image_top_left.dimensions.width}w, ${homeData.content_image_top_left.Small.url} ${homeData.content_image_top_left.Small.dimensions.width}w`}
          src={homeData.content_image_top_left.url}
          alt={homeData.content_image_top_left.alt}
        />
        <img
          className="galleri-right"
          sizes="243w"
          srcSet={`${homeData.content_image_right.url} ${homeData.content_image_right.dimensions.width}w, ${homeData.content_image_right.Small.url} ${homeData.content_image_right.Small.dimensions.width}w`}
          src={homeData.content_image_right.url}
          alt={homeData.content_image_right.alt}
        />
        <img
          className="galleri-bottom"
          sizes="221w"
          srcSet={`${homeData.content_image_bottom.url} ${homeData.content_image_bottom.dimensions.width}w, ${homeData.content_image_bottom.Small.url} ${homeData.content_image_bottom.Small.dimensions.width}w`}
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
        <a
          className="footer-info-item"
          href="https://www.google.com/maps/place/Yuzu/@64.146056,-21.9277311,17z/data=!3m1!4b1!4m5!3m4!1s0x48d67597741f36a3:0x598feecd0e39671a!8m2!3d64.146056!4d-21.9277311"
        >
          Hverfisgata 44
        </a>

        <p className="footer-info-item">{homeData.open}</p>
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
        min-height: 360px;
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
        display: grid;
        justify-items: center;
        grid-gap: 32px;
        flex-grow: 0;
        flex-shrink: 0;
        justify-content: space-between;
        padding: 12px;
      }
      .top-item {
        grid-row: 1;
        margin: 0;
        color: white;
        font-size: 14px;
        text-transform: lowercase;
        letter-spacing: 0.05em;
        text-decoration: none;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
      }
      .top-item--rightAlign {
        text-align: right;
      }

      header {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
      }

      .header-title {
        border: 4px solid ${colors.lemon};
        margin: 10px;
        background-color: white;
        max-width: 500px;
        flex-grow: 1;
      }

      .logo {
        display: block;
        width: 100%;
        height: auto;
      }

      .about {
        display: grid;
        place-items: center;
        padding-top: 35px;
        padding-left: 24px;
        padding-right: 24px;
        max-width: 900px;
        margin: 0 auto 60px;
      }

      .about-text {
        margin: 0;
        color: ${colors.ocean};
        font-family: 'Shinra';
        font-size: 28px;
        text-align: center;
        line-height: 1.3;
      }

      .menu {
        padding: 25px;
        margin: calc(20% + 60px) 0 calc(20% + 80px);
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
        max-width: 221px;
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
        padding: 0 25px 45px;
      }
      .footer-text {
        color: ${colors.ocean};
        text-align: center;
        font-family: 'Shinra';
        font-size: 50px;
        margin: 2em 0 0.8em;
        text-transform: uppercase;
        -webkit-font-smoothing: subpixel-antialiased;
        -moz-osx-font-smoothing: subpixel-antialiased;
      }
      .footer-info {
        display: grid;
        grid-gap: 12px;
        place-items: center;
      }
      .footer-info-item {
        color: ${colors.ocean};
        font-size: 14px;
        text-transform: lowercase;
        text-decoration: none;
        text-align: center;
        margin: 0;
      }

      @media (min-width: 600px) {
        .top {
          margin: 20px 30px;
        }
        .top-item {
          font-size: 16px;
        }
        .about-text {
          font-size: 33px;
          margin: 0;
          -webkit-font-smoothing: subpixel-antialiased;
          -moz-osx-font-smoothing: subpixel-antialiased;
        }
        .footer-info {
          grid-template-columns: auto auto;
          max-width: 700px;
          margin: 0 auto;
        }
      }

      @media (min-width: 800px) {
        .about {
          margin-top: 80px;
          grid-gap: 32px;
          grid-template-columns: 1fr 1fr;
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
          margin-top: 1em;
          font-size: 83px;
        }
        .footer-info-item {
          font-size: 19px;
        }
      }
    `}</style>
  </>
)

Index.getInitialProps = async ({ res }) => {
  if (res) {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  }
  const API = await Prismic.getApi('https://yuzu.cdn.prismic.io/api/v2')
  const home = await API.getSingle('home')
  return { homeData: home.data as HomeData }
}

export default Index
