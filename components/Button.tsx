import { StatelessComponent } from 'react'
import { colors } from '../constants'

interface Props {
  href: string
}

const Button: StatelessComponent<Props> = ({ href, children }) => (
  <a href={href}>
    {children}
    <style jsx>{`
      a {
        background: ${colors.lemon};
        color: ${colors.ocean};
        font-size: 14px;
        text-transform: lowercase;
        padding: 13px 20px 13px;
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
