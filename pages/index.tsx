import { NextPage } from 'next'
import Head from 'next/head'

const colors = {
  lemon: '#F8C000',
  ocean: '#2d3a8a',
}

const Index: NextPage<{}> = () => (
  <div>
    <Head>
      <title>Yuzu Oriental Burgers</title>
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:600&display=swap"
        rel="stylesheet"
      />
    </Head>

    <h1>
      <img
        className="🖼"
        src="/static/logo.png"
        alt="Yuzu – Hverfisgata 44, Reykjavík, Iceland"
      />
    </h1>

    <a className="📤" href="https://www.instagram.com/yuzuburger/">
      @yuzuburger
    </a>

    <p className="🔜">Opnum fljótt</p>

    <style jsx>{`
      :global(*),
      :global(*::after),
      :global(*::before) {
        box-sizing: border-box;
      }

      :global(body) {
        width: 100vw;
        height: 100vh;
        margin: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        background-image: url('/static/japanese.png'),
          url('/static/background.jpg');
        background-size: 167px 23px, cover;
        background-position: bottom left, center center;
        background-repeat: repeat-x, no-repeat;

        font-family: 'Raleway', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      h1 {
        margin: 0;
        border: 4px solid ${colors.lemon};
        margin: 10px;
        padding-bottom: 30px;
        background-color: white;
        max-width: 500px;
      }

      .🖼 {
        display: block;
        width: 100%;
        height: auto;
      }

      .📤 {
        position: absolute;
        top: 12px;
        left: 10px;

        text-transform: uppercase;
        color: ${colors.ocean};
        text-decoration: none;
        letter-spacing: 0.15em;
      }

      .🔜 {
        position: absolute;
        top: 12px;
        right: 10px;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.15em;

        color: ${colors.ocean};
      }

      @media (min-width: 500px) {
        .🔜 {
          top: 20px;
          right: 30px;
        }

        .📤 {
          top: 20px;
          left: 30px;
        }
      }
    `}</style>
  </div>
)

export default Index
