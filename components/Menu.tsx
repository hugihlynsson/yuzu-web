import React, { FunctionComponent } from 'react'

import { Diet, DrinksSection, WinesSection, PrismicImage } from '../types'
import { colors } from '../constants'

const dietCopy: { [key in Diet]: string } = {
  'Vegan (v)': '(v)',
  'No specific diet': '',
  'Vegetarian (g)': '(g)',
}

interface Props {
  title?: string
  burgerTitle?: string
  burgers: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  burgersExtraInfoFirst?: string
  burgersExtraInfoSecond?: string
  sidesTitle?: string
  sides: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  dipsTitle?: string
  dips: Array<{ name?: string }>
  dipsPrice?: number
  grillTitle?: string
  grillSubtitle?: string
  grill: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  drinksTitle?: string
  body: Array<DrinksSection | WinesSection>
  lunchOffer?: PrismicImage
}

const Menu: FunctionComponent<Props> = ({
  title,
  burgerTitle,
  burgers,
  burgersExtraInfoFirst,
  burgersExtraInfoSecond,
  sidesTitle,
  sides,
  dipsTitle,
  dips,
  dipsPrice,
  grillTitle,
  grillSubtitle,
  grill,
  drinksTitle,
  body,
  lunchOffer,
}) => (
  <section className="menu">
    <div className="menu-section">
      <h1 className="menu-title">{title}</h1>
    </div>

    <section className="menu-section">
      <h2 className="menu-section-title menu-section-title--big">
        {burgerTitle}
      </h2>

      {burgers.map((burger) => (
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

      {lunchOffer && (
        <img
          className="menu-lunchOffer"
          src={lunchOffer.url}
          alt={lunchOffer.alt}
        />
      )}

      <div className="menu-burgers-extras">
        <p className="menu-burgers-extra">{burgersExtraInfoFirst}</p>

        <p className="menu-burgers-extra">{burgersExtraInfoSecond}</p>
      </div>
    </section>

    <div className="menu-horizontal">
      <section className="menu-section menu-section--horizontal">
        <h2 className="menu-section-title">{grillTitle}</h2>

        <p className="menu-section-subtitle">{grillSubtitle}</p>

        {grill.map((grill) => (
          <article key={grill.name} className="menu-grill">
            <h3 className="menu-grill-title">
              {grill.name}{' '}
              {grill.diet !== 'No specific diet' && (
                <span className="menu-grill-diet">{dietCopy[grill.diet]}</span>
              )}
            </h3>

            {grill.description && (
              <p className="menu-grill-description">{grill.description}</p>
            )}

            <p className="menu-grill-price">{grill.price} kr.</p>
          </article>
        ))}
      </section>

      <section className="menu-section menu-section--horizontal">
        <h2 className="menu-section-title">{sidesTitle}</h2>

        <div className="menu-grill-items">
          {sides.map((side) => (
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
        </div>
      </section>

      <section className="menu-section menu-section--horizontal">
        <h2 className="menu-section-title">{dipsTitle}</h2>

        {dips.map((dip) => (
          <p key={dip.name} className="menu-dip">
            {dip.name}
          </p>
        ))}

        <p className="menu-dips-price">{dipsPrice} kr.</p>
      </section>
    </div>

    <section className="menu-section">
      <h2 className="menu-section-title menu-section-title--big">
        {drinksTitle}
      </h2>

      <div className="menu-drink-sections">
        <div>
          {body
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
          {body
            .filter(
              (item): item is WinesSection => item.slice_type === 'wine_section'
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

    <style jsx>{`
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

      @media (min-width: 600px) {
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
      }

      @media (min-width: 800px) {
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
        .menu-side {
          break-inside: avoid;
        }
        .menu-lunchOffer {
          top: 50px;
          right: -80px;
        }
      }
    `}</style>
  </section>
)

export default Menu
