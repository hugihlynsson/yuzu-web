import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'

const colors = {
  lemon: '#f8c000',
  ocean: '#2d3a8a',
  sky: '#969DC5',
}

declare const fbq: any

type Diet = 'Vegan (v)' | 'No specific diet' | 'Vegetarian (g)'

const dietCopy: { [key in Diet]: string } = {
  'Vegan (v)': '(v)',
  'No specific diet': '',
  'Vegetarian (g)': '(g)',
}

interface PrismicImage {
  alt?: string
  dimensions: { width: number; height: number }
  url: string
}

interface DrinksSection {
  slice_type: 'drinks_section'
  items: Array<{
    name?: string
    description?: string
    unit?: string
    price?: number
  }>
  primary: { title?: string }
}

interface WinesSection {
  slice_type: 'wine_section'
  items: Array<{
    name?: string
    description?: string
    glass_price?: string
    bottle_price?: number
  }>
  primary: { title?: string }
}

interface HomeData {
  open?: string
  phone?: number
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
      <div className="menu-section">
        <h1 className="menu-title">{homeData.menu_title}</h1>
      </div>

      <section className="menu-section">
        <h2 className="menu-section-title menu-section-title--big">
          {homeData.burgers_title}
        </h2>

        {homeData.burgers.map((burger) => (
          <article key={burger.name} className="menu-burgers">
            <h3 className="menu-burgers-title">
              {burger.name}{' '}
              {burger.diet !== 'No specific diet' && (
                <span className="menu-burgers-diet">
                  {dietCopy[burger.diet]}{' '}
                </span>
              )}
              <span className="menu-burgers-price">{burger.price} kr.</span>
            </h3>

            <p className="menu-burgers-description">{burger.description}</p>
          </article>
        ))}

        {homeData.lunch_offer && (
          <img
            className="menu-lunchOffer"
            src={homeData.lunch_offer.url}
            alt={homeData.lunch_offer.alt}
          />
        )}

        <div className="menu-burgers-extras">
          <p className="menu-burgers-extra">
            {homeData.burgers_extra_info_first}
          </p>

          <p className="menu-burgers-extra">
            {homeData.burgers_extra_info_second}
          </p>
        </div>
      </section>

      <div className="menu-horizontal">
        <section className="menu-section menu-section--horizontal">
          <h2 className="menu-section-title">{homeData.sides_title}</h2>

          {homeData.sides.map((side) => (
            <article key={side.name} className="menu-side">
              <h3 className="menu-side-title">
                {side.name}{' '}
                {side.diet !== 'No specific diet' && (
                  <span className="menu-side-diet">{dietCopy[side.diet]}</span>
                )}
              </h3>

              {side.description && (
                <p className="menu-side-description">{side.description}</p>
              )}

              <p className="menu-side-price">{side.price} kr.</p>
            </article>
          ))}
        </section>

        <section className="menu-section menu-section--horizontal">
          <h2 className="menu-section-title">{homeData.grill_title}</h2>

          <p className="menu-section-subtitle">{homeData.grill_subtitle}</p>

          <div className="menu-grill-items">
            {homeData.grill.map((grill) => (
              <article key={grill.name} className="menu-grill">
                <h3 className="menu-grill-title">
                  {grill.name}{' '}
                  {grill.diet !== 'No specific diet' && (
                    <span className="menu-grill-diet">
                      {dietCopy[grill.diet]}
                    </span>
                  )}
                </h3>

                {grill.description && (
                  <p className="menu-grill-description">{grill.description}</p>
                )}

                <p className="menu-grill-price">{grill.price} kr.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="menu-section menu-section--horizontal">
          <h2 className="menu-section-title">{homeData.dips_title}</h2>

          {homeData.dips.map((dip) => (
            <p key={dip.name} className="menu-dip">
              {dip.name}
            </p>
          ))}

          <p className="menu-dips-price">{homeData.dips_price} kr.</p>
        </section>
      </div>

      <section className="menu-section">
        <h2 className="menu-section-title menu-section-title--big">
          {homeData.drinks_title}
        </h2>

        <div className="menu-drink-sections">
          <div>
            {homeData.body
              .filter(
                (item): item is DrinksSection =>
                  item.slice_type === 'drinks_section'
              )
              .map((drinks, index) => (
                <section key={index} className="menu-subsection">
                  <h3 className="menu-subsection-title">
                    {drinks.primary.title}
                  </h3>

                  {drinks.items.map((item) => (
                    <article key={item.name} className="menu-drink">
                      <h4 className="menu-drink-name">{item.name}</h4>
                      {item.description && (
                        <span className="menu-drink-description">
                          {item.description}
                        </span>
                      )}
                      <span className="menu-drink-unit">{item.unit}</span>
                      <span className="menu-drink-price">{item.price} kr.</span>
                    </article>
                  ))}
                </section>
              ))}
          </div>

          <div>
            {homeData.body
              .filter(
                (item): item is WinesSection =>
                  item.slice_type === 'wine_section'
              )
              .map((drinks, index) => (
                <section key={index} className="menu-subsection">
                  <header className="menu-subsection-header">
                    <h3 className="menu-subsection-title">
                      {drinks.primary.title}
                    </h3>

                    <span className="menu-subsection-header-price">Glas</span>

                    <span className="menu-subsection-header-price">Flaska</span>
                  </header>

                  {drinks.items.map((item) => (
                    <article key={item.name} className="menu-wine">
                      <div className="menu-wine-top">
                        <h4 className="menu-drink-name">{item.name}</h4>

                        {item.glass_price && (
                          <span className="menu-drink-price">
                            {item.glass_price} kr.
                          </span>
                        )}

                        <span className="menu-drink-price menu-drink-price--second">
                          {item.bottle_price} kr.
                        </span>
                      </div>

                      <div className="menu-wine-description">
                        {item.description}
                      </div>
                    </article>
                  ))}
                </section>
              ))}
          </div>
        </div>
      </section>
    </section>

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
        position: relative;
        margin: 10px 10px 0;
        background-color: white;
        border: 2px solid ${colors.ocean};
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      .menu::after {
        content: '';
        display: block;
        position: absolute;
        width: 100vw;
        top: 8vh;
        bottom: 8vh;
        background-color: ${colors.lemon};
        z-index: -1;
        left: 50%;
        transform: translateX(-50%);
      }
      .menu-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        border-bottom: 2px solid ${colors.ocean};
      }
      .menu-section:last-child:not(.menu-section--horizontal) {
        border-bottom: 0;
      }
      .menu-title {
        font-size: 25px;
        text-align: center;
        text-transform: lowercase;
        font-weight: 400;
        letter-spacing: 0.3em;
        color: ${colors.ocean};
        margin: 0.5em 0;
      }
      .menu-section-title {
        font-size: 20px;
        text-transform: lowercase;
        font-weight: 400;
        color: ${colors.ocean};
        letter-spacing: 0.3em;
        text-align: center;
        margin: 20px 0 30px;
        line-height: 1.1;
      }
      .menu-section-title--big {
        margin: 30px 0 40px;
      }
      .menu-section-subtitle {
        font-size: 11px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        color: ${colors.sky};
        margin: 0 0 0.3em;
        margin-top: -2.5em;
        margin-bottom: 3em;
      }
      .menu-burgers {
        margin: 0 12px 24px;
        max-width: 380px;
      }
      .menu-burgers-title {
        font-size: 17px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        font-weight: 400;
        letter-spacing: 0.2em;
        color: ${colors.ocean};
        margin: 0 0 0.3em;
      }
      .menu-burgers-diet {
        font-size: 15px;
      }
      .menu-burgers-price {
        font-size: 14px;
        display: inline-block;
      }
      .menu-burgers-description {
        font-family: 'Shinra';
        font-size: 14px;
        line-height: 1.25;
        text-align: center;
        color: ${colors.ocean};
        margin: 0;
      }
      .menu-burgers-extra {
        font-family: 'Shinra';
        font-size: 14px;
        line-height: 1.25;
        text-align: center;
        color: ${colors.ocean};
        margin: 0 16px;
        padding-bottom: 0.5em;
      }
      .menu-lunchOffer {
        max-width: 100%;
        height: auto;
      }
      .menu-side {
        margin: 0 auto 20px;
        max-width: 150px;
      }
      .menu-side-title {
        font-size: 14px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        font-weight: 400;
        letter-spacing: 0.1em;
        color: ${colors.ocean};
        margin: 0 0 0.3em;
      }
      .menu-side-diet {
        font-size: 12px;
      }
      .menu-side-description {
        font-family: 'Shinra';
        font-size: 13px;
        line-height: 1.25;
        text-align: center;
        color: ${colors.ocean};
        margin: 0 0 0.5em;
      }
      .menu-side-price {
        font-size: 10px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        font-weight: 400;
        letter-spacing: 0.1em;
        color: ${colors.ocean};
        margin: 0 0 0.3em;
      }
      .menu-grill {
        margin: 0 auto 20px;
        max-width: 150px;
      }
      .menu-grill-title {
        font-size: 14px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        font-weight: 400;
        letter-spacing: 0.1em;
        color: ${colors.ocean};
        margin: 0 0 0.3em;
      }
      .menu-grill-diet {
        font-size: 12px;
      }
      .menu-grill-description {
        font-family: 'Shinra';
        font-size: 13px;
        line-height: 1.25;
        text-align: center;
        color: ${colors.ocean};
        margin: 0 0 0.5em;
      }
      .menu-grill-price {
        font-size: 10px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        font-weight: 400;
        letter-spacing: 0.1em;
        color: ${colors.ocean};
        margin: 0 0 0.3em;
      }
      .menu-dip {
        font-family: 'Shinra';
        font-size: 17px;
        line-height: 1.25;
        text-align: center;
        color: ${colors.ocean};
        margin: 0 0 0.2em;
      }
      .menu-dips-price {
        font-size: 12px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        font-weight: 400;
        letter-spacing: 0.3em;
        color: ${colors.ocean};
        margin: 2.5em 0 2em;
      }
      .drinks {
        display: flex;
        flex-direction: column;
        align-items: row;
      }
      .menu-subsection {
        padding-bottom: 25px;
      }
      .menu-subsection-header {
        display: flex;
      }
      .menu-subsection-title {
        font-size: 11px;
        text-transform: lowercase;
        line-height: 1.15;
        color: ${colors.sky};
        margin: 0 0 8px 0;
        font-weight: 400;
        margin-bottom: 6px;
        flex-grow: 1;
      }
      .menu-subsection-header-price {
        font-size: 11px;
        text-transform: lowercase;
        line-height: 1.15;
        color: ${colors.sky};
        margin: 0 0 8px 0;
        font-weight: 400;
        margin-bottom: 6px;
        margin-right: 36px;
      }
      .menu-subsection-header-price:last-child {
        margin-right: 14px;
      }
      .menu-drink {
        display: flex;
        margin-bottom: 4px;
        align-items: center;
      }
      .menu-drink-name {
        font-size: 13px;
        text-transform: lowercase;
        line-height: 15px;
        font-weight: 400;
        color: ${colors.ocean};
        margin: 0 4px 0 0;
      }
      .menu-drink-description {
        font-size: 8px;
        padding-top: 3px;
        text-transform: lowercase;
        color: ${colors.ocean};
        margin: 0 4px 0 0;
      }
      .menu-drink-unit {
        font-family: 'Shinra';
        font-size: 11px;
        padding-top: 1px;
        color: ${colors.ocean};
        margin-right: 4px;
      }
      .menu-drink-price {
        font-size: 10px;
        text-transform: lowercase;
        padding-top: 2px;
        color: ${colors.ocean};
        margin: 0 0 0 4px;
        flex-grow: 1;
        text-align: right;
      }
      .menu-drink-price--second:not(:nth-child(2)) {
        flex-grow: initial;
        margin-left: 14px;
      }
      .menu-wine {
        margin-bottom: 6px;
      }
      .menu-wine-top {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      }
      .menu-wine-description {
        font-size: 8px;
        text-transform: lowercase;
        color: ${colors.ocean};
        margin: 0 4px 0 0;
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
        }

        .menu-title {
          font-size: 34px;
        }
        .menu-section-title--big {
          font-size: 26px;
        }
        .menu-burgers-extras {
          display: flex;
          justify-content: space-between;
          align-self: stretch;
        }
        .menu-burgers-extras:first {
          margin-right: 16px;
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

        .menu-horizontal {
          display: flex;
        }
        .menu-section--horizontal {
          flex-grow: 2;
          border-right: 2px solid ${colors.ocean};
        }
        .menu-section--horizontal:last-child {
          border-right: 0;
        }
        .menu-drink-sections {
          display: flex;
          align-self: stretch;
          padding: 0 30px;
        }
        .menu-drink-sections > div {
          width: 50%;
          padding: 0 30px;
        }
        .menu-drink-sections > div:not(:last-child) {
        }
        .menu-subsection {
          padding-bottom: 20px;
        }
        .menu-lunchOffer {
          position: absolute;
          top: 4px;
          right: -30px;
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

      @media (min-width: 900px) {
        .menu {
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
        }
        .menu-section--horizontal:nth-child(2) {
          flex-grow: 3;
        }
        .menu-grill-items {
          columns: 2;
          column-gap: 4px;
        }
        .menu-grill {
          break-inside: avoid;
        }
        .menu-lunchOffer {
          top: 50px;
          right: -80px;
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
