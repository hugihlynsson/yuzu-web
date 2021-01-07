import React, { FunctionComponent } from 'react'
import { RichText } from 'prismic-reactjs'

import Button from './Button'
import { colors } from '../constants'

declare const fbq: any

interface Props {
  title?: string
  body: unknown
}

const Reserve: FunctionComponent<Props> = ({ title, body }) => (
  <section className="reserve">
    <div className="orderButtonBox">
      <Button onClick={() => fbq('track', 'Lead')} href="https://panta.yuzu.is">
        Panta take-away
      </Button>
      <p className="orderButtonDescription">Þú pantar og sækir</p>
    </div>

    <h1 className="reserve-title">{title}</h1>

    <div className="reserve-body">
      <RichText
        render={body}
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
            rel={element.data.target === '_blank' ? 'noopener noreferrer' : ''}
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

    <style jsx>{`
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
      .orderButtonBox {
        margin-bottom: 40px;
      }
      .orderButtonDescription {
        margin-top: 4px;
        color: white;
        font-size: 12px;
        text-transform: lowercase;
        text-align: center;
      }

      .reserve-title {
        font-size: 22px;
        text-align: center;
        text-transform: lowercase;
        line-height: 1.15;
        font-weight: 400;
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

      @media (min-width: 600px) {
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
      }
    `}</style>
  </section>
)

export default Reserve
