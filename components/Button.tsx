import { FunctionComponent } from 'react'
import { colors } from '../constants'

interface Props {
  href: string
}

const Button: FunctionComponent<Props> = ({ href, children }) => (
  <a href={href}>
    {children}
    <style jsx>{`
      a {
        display: inline-block;
        background: ${colors.lemon};
        color: ${colors.ocean};
        font-size: 16px;
        text-transform: lowercase;
        padding: 14px 20px 16px;
        transition: filter 0.2s;
        text-decoration: none;
      }
      a:hover {
        filter: brightness(105%);
      }
    `}</style>
  </a>
)

export default Button
