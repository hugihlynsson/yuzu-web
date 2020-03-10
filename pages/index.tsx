import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'

import Hero from '../components/Hero'
import Menu from '../components/Menu'
import Reserve from '../components/Reserve'
import Gallery from '../components/Gallery'
import { colors, prismicUrl } from '../constants'
import { HomeData } from '../types'

interface Props {
  homeData: HomeData
}

const Index: NextPage<Props> = ({ homeData }) => (
  <>
    <Head>
      <title>{homeData.title}</title>
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

    <Reserve
      title={homeData.reservation_title}
      body={homeData.reservation_body}
    />

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

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
}) => {
  // const options = preview ? { accessToken: previewData.token } : {}
  console.log('Preview', preview, previewData)
  const api = await Prismic.api(prismicUrl)
  const home = await api.getSingle('home')

  return {
    props: { homeData: home.data as HomeData },
  }
}

export default Index
