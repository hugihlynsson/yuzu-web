import React, { FunctionComponent } from 'react'

import { PrismicImage } from '../types'

interface Props {
  topLeft: PrismicImage & {
    Small: PrismicImage
  }
  right: PrismicImage & {
    Small: PrismicImage
  }
  bottom: PrismicImage & {
    Small: PrismicImage
  }
}

const Gallery: FunctionComponent<Props> = ({ topLeft, right, bottom }) => (
  <section className="gallery">
    <img className="kanjiYuzu" src="/kanji-yuzu.svg" alt="Yuzu á Japönsku" />

    <div className="images">
      <img
        className="topLeft"
        sizes="328w"
        srcSet={`${topLeft.url} ${topLeft.dimensions.width}w, ${topLeft.Small.url} ${topLeft.Small.dimensions.width}w`}
        src={topLeft.url}
        alt={topLeft.alt}
      />

      <img
        className="right"
        sizes="243w"
        srcSet={`${right.url} ${right.dimensions.width}w, ${right.Small.url} ${right.Small.dimensions.width}w`}
        src={right.url}
        alt={right.alt}
      />

      <img
        className="bottom"
        sizes="221w"
        srcSet={`${bottom.url} ${bottom.dimensions.width}w, ${bottom.Small.url} ${bottom.Small.dimensions.width}w`}
        src={bottom.url}
        alt={bottom.alt}
      />
    </div>

    <img
      className="kanjiBurgers"
      src="/kanji-burgers.svg"
      alt="Borgarar á Japönsku"
    />

    <style jsx>{`
      .gallery {
        padding: 25px 25px 70px;
        position: relative;
        max-width: 800px;
        margin: 0 auto;
      }
      .kanjiYuzu {
        position: absolute;
        right: 50px;
        top: 0;
      }
      .images {
        display: flex;
        flex-direction: column;
        max-width: 540px;
        margin: 0 auto;
      }
      .topLeft {
        width: 60%;
        max-width: 328px;
        height: auto;
      }
      .right {
        width: 50%;
        max-width: 243px;
        height: auto;
        align-self: flex-end;
        margin-top: -20%;
      }
      .bottom {
        width: 40%;
        max-width: 221px;
        height: auto;
        margin-top: -30%;
        align-self: center;
        margin-right: 20%;
      }
      .kanjiBurgers {
        position: absolute;
        left: 20px;
        bottom: 0;
      }

      @media (min-width: 800px) {
        .kanjiYuzu {
          left: 10px;
          top: 30%;
          right: auto;
        }
        .kanjiBurgers {
          bottom: 30%;
          right: 10px;
          left: auto;
        }
      }
    `}</style>
  </section>
)

export default Gallery
