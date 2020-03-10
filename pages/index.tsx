import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'

import Hero from '../components/Hero'
import Menu from '../components/Menu'
import Gallery from '../components/Gallery'
import { colors } from '../constants'
import { Diet, DrinksSection, WinesSection, PrismicImage } from '../types'

declare const fbq: any

interface HomeData {
  opening_hours?: Array<{ day: string }>
  phone?: string
  instagram_handle?: string
  header_image: PrismicImage & {
    Narrow: PrismicImage
    Medium: PrismicImage
    Small: PrismicImage
    Share: PrismicImage
  }
  city?: string
  address?: string
  country?: string
  text?: string
  content_image_top_left: PrismicImage & {
    Small: PrismicImage
  }
  content_image_right: PrismicImage & {
    Small: PrismicImage
  }
  content_image_bottom: PrismicImage & {
    Small: PrismicImage
  }
  footer_text?: string
  title?: string
  description?: string

  menu_title?: string
  burgers_title?: string
  burgers: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  burgers_extra_info_first?: string
  burgers_extra_info_second?: string
  sides_title?: string
  sides: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  dips_title?: string
  dips: Array<{ name?: string }>
  dips_price?: number
  grill_title?: string
  grill_subtitle?: string
  grill: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  drinks_title?: string
  body: Array<DrinksSection | WinesSection>
  lunch_offer?: PrismicImage
  reservation_title?: string
  reservation_body?: unknown
}

interface Props {
  homeData: HomeData
}

const Index: NextPage<Props> = ({ homeData }) => (
  <>
    <Head>
      <title>{homeData.title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <link rel="icon" href="/icon.png" />
      <link rel="apple-touch-icon" href="/icon-512w.png" />
      <meta name="description" content={homeData.description} />
      <meta property="og:url" content="https://yuzu.is" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={homeData.title} />
      <meta property="og:description" content={homeData.description} />
      <meta property="og:image" content={homeData.header_image.Share.url} />
    </Head>

    <Hero
      instagramHandle={homeData.instagram_handle}
      phone={homeData.phone}
      headerImage={homeData.header_image}
      openingHours={homeData.opening_hours}
    />

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

    <Menu
      title={homeData.menu_title}
      burgerTitle={homeData.burgers_title}
      burgers={homeData.burgers}
      burgersExtraInfoFirst={homeData.burgers_extra_info_first}
      burgersExtraInfoSecond={homeData.burgers_extra_info_second}
      sidesTitle={homeData.sides_title}
      sides={homeData.sides}
      dipsTitle={homeData.dips_title}
      dips={homeData.dips}
      dipsPrice={homeData.dips_price}
      grillTitle={homeData.grill_title}
      grillSubtitle={homeData.grill_subtitle}
      grill={homeData.grill}
      drinksTitle={homeData.drinks_title}
      body={homeData.body}
      lunchOffer={homeData.lunch_offer}
    />

    <section className="reserve">
      <h1 className="reserve-title">{homeData.reservation_title}</h1>

      <div className="reserve-body">
        <RichText
          render={homeData.reservation_body}
          serializeHyperlink={(
            type: any,
            element: { data: { url: string; target: string } },
            content: any,
            children: React.ReactNode,
            index: number
          ) => (
            <a
              key={index}
              href={element.data.url}
              target={element.data.target}
              rel={
                element.data.target === '_blank' ? 'noopener noreferrer' : ''
              }
              onClick={() => {
                if (element.data.url.includes('yuzu.dinesuperb.com') && fbq) {
                  fbq('track', 'Lead')
                }
              }}
            >
              {children}
            </a>
          )}
        />
      </div>
    </section>

    <Gallery
      topLeft={homeData.content_image_top_left}
      right={homeData.content_image_right}
      bottom={homeData.content_image_bottom}
    />

    <footer>
      <p className="footer-text">{homeData.footer_text}</p>
      <div className="footer-info">
        <a
          className="footer-info-item"
          href="https://www.google.com/maps/place/Yuzu/@64.146056,-21.9277311,17z/data=!3m1!4b1!4m5!3m4!1s0x48d67597741f36a3:0x598feecd0e39671a!8m2!3d64.146056!4d-21.9277311"
        >
          Hverfisgata 44
        </a>

        {homeData.phone && (
          <a className="footer-info-item" href={`tel:${homeData.phone}`}>
            s.{homeData.phone.toString().substring(0, 3)}-
            {homeData.phone.toString().substring(3, 7)}
          </a>
        )}
      </div>
    </footer>

    <style jsx>{`
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

      .reserve {
        position: relative;
        background-color: ${colors.ocean};
        padding: 36px 48px 50px;
        margin-bottom: 80px;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .reserve:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        height: 10vh;
        bottom: 100%;
        z-index: -2;
        background-color: ${colors.ocean};
      }
      .reserve-title {
        font-size: 22px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        font-weight: 400;
        letter-spacing: 0.3em;
        color: white;
        margin: 0 0 16px 0;
        max-width: 560px;
        text-align: center;
      }
      .reserve-body {
        max-width: 560px;
      }
      .reserve-body :global(p) {
        font-family: 'Shinra';
        font-size: 20px;
        line-height: 1.2;
        color: white;
        text-align: center;
        margin: 0 0 0.7em;
      }
      .reserve-body :global(a) {
        color: white;
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
        .about-text {
          font-size: 33px;
          margin: 0;
        }

        .reserve {
          padding-top: 60px;
          padding-bottom: 60px;
        }
        .reserve-title {
          font-size: 28px;
        }
        .reserve-body :global(p) {
          font-size: 24px;
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

Index.getInitialProps = async ({ req, res, query }) => {
  if (res && !('preview' in query)) {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  }
  const API = await Prismic.getApi('https://yuzu.cdn.prismic.io/api/v2', {
    req,
  })
  const home = await API.getSingle('home')
  return { homeData: home.data as HomeData }
}

export default Index
