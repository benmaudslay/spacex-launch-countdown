import { createGlobalStyle } from 'styled-components'
import brandonFont from './fonts/brandon-grotesque-medium.otf'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'BrandonMedium';
    src: url(${brandonFont});
    font-weight: 400;
    
  }
`

export default GlobalStyles
