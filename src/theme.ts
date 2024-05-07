import { extendTheme } from '@chakra-ui/react'

// Define your config, including the color modes

const myPalette = {
  science: { light: '#9AE6B4', dark: '#1C4532' },
  geography: { light: '#8fcdf4', dark: '#1A365D' },
  history: { light: '#FAF089', dark: '#5F370E' },
  general_knowledge: { light: '#FBB6CE', dark: '#521B41' },
  food_and_drink: { light: '#9DECF9', dark: '#065666' },
  sport_and_leisure: { light: '#FBD38D', dark: '#652B19' },
  music: { light: '#D6BCFA', dark: '#322659' },
  film_and_tv: { light: '#FEB2B2', dark: '#63171B' },
  grey: { light: '#E2E8F0', dark: '#2D3748' },
}


// extend the theme
const theme = extendTheme(
  {
    colors: myPalette,
    initialColorMode: 'dark', useSystemColorMode: true,
    semanticTokens: myPalette
  }
)

export default theme