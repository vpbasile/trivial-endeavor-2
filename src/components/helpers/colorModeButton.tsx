import { Button, useColorMode } from "@chakra-ui/react"

export default function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (<Button onClick={toggleColorMode}>
    Color Mode: {colorMode === 'light' ? 'Light' : 'Dark'}
  </Button>)
}