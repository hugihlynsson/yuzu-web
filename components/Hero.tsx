import React, { FunctionComponent } from 'react'
import { RichText } from 'prismic-reactjs'

import Button from './Button'
import { colors } from '../constants'
import { PrismicImage } from '../types'

declare const fbq: any

interface Props {
  instagramHandle?: string
  phone?: string
  headerImage: PrismicImage & {
    Narrow: PrismicImage
    Medium: PrismicImage
    Small: PrismicImage
    Share: PrismicImage
  }
  openingHours?: Array<{ day: string }>
  ordertext: unknown
}

const Hero: FunctionComponent<Props> = ({
  instagramHandle,
  phone,
  headerImage,
  openingHours,
  ordertext,
}) => (
  <div className="hero">
    <div className="top">
      {instagramHandle && (
        <a
          className="top-item"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.instagram.com/${instagramHandle}/`}
        >
          @{instagramHandle}
        </a>
      )}

      {phone && (
        <a className="top-item" href={`tel:${phone}`}>
          s.{phone.toString().substring(0, 3)}-
          {phone.toString().substring(3, 7)}
        </a>
      )}
    </div>

    <picture>
      <source
        className="hero-image"
        media="(max-aspect-ratio: 1/1)"
        srcSet={headerImage.Narrow.url}
      />
      <img
        className="hero-image"
        sizes="100vw"
        srcSet={`${headerImage.url} ${headerImage.dimensions.width}w, ${headerImage.Medium.url} ${headerImage.Medium.dimensions.width}w, ${headerImage.Small.url} ${headerImage.Small.dimensions.width}w`}
        src={headerImage.url}
        alt={headerImage.alt || ''}
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

    <div className="orderButtonBox">
      <Button onClick={() => fbq('track', 'Lead')} href="https://panta.yuzu.is">
        Panta take-away
      </Button>
      <p className="orderButtonDescription">
        <RichText
          render={ordertext}
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
      </p>
    </div>

    {openingHours && (
      <p className="hero-openingHours">
        {openingHours.map(({ day }, index, days) => (
          <span className="hero-openingHours-day" key={index}>
            {day}
            {index < days.length - 1 && ', '}
          </span>
        ))}
      </p>
    )}

    <style jsx>{`
      .hero {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 100%;
        position: relative;
        min-height: 380px;
        min-height: fit-content;
      }
      .hero::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: -1;
      }

      .hero-image {
        z-index: -2;
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

      header {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
      }

      .header-title {
        border: 4px solid ${colors.lemon};
        margin: 0 10px;
        background-color: white;
        max-width: 500px;
        flex-grow: 1;
      }

      .logo {
        display: block;
        width: 100%;
        height: auto;
      }

      .orderButtonBox {
        align-self: center;
        margin-top: 25px;
        text-align: center;
      }
      .orderButtonDescription {
        margin-top: 4px;
        color: white;
        font-size: 12px;
        text-transform: lowercase;
        text-align: center;
      }

      .orderButtonDescription a {
        color: white;
      }

      .hero-openingHours {
        color: white;
        text-align: center;
        margin: 25px 12px 12px;
        font-size: 14px;
      }
      .hero-openingHours-day {
        display: block;
      }

      @media (min-width: 600px) {
        .top {
          padding: 25px;
        }
        .top-item {
          font-size: 16px;
        }
        .hero-openingHours {
          margin: 25px;
        }
      }

      @media (min-width: 800px) {
        .hero-openingHours-day {
          display: inline-block;
        }
        .hero-openingHours-day::after {
          content: ' ';
          display: inline-block;
        }
      }
    `}</style>
  </div>
)

export default Hero
