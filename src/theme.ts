import { ThemeConfig, defineStyleConfig, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

// Define your config
const colrModeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

// This saves you time, instead of manually setting the size,
// variant and color scheme every time you use a button:
export const buttonTheme = defineStyleConfig({
  defaultProps: {
    size: 'lg',
    variant: 'outline',
    colorScheme: 'red',
  },
})

// extend the theme
const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'gray', components: ['Button'], })
  , colrModeConfig
  , buttonTheme 
  )

export default theme