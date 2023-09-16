
// Import ChakraUI elements
import { Box, Text, Link, Image, List, ListIcon, ListItem, Heading, Center, useColorMode } from '@chakra-ui/react'
import { ExternalLinkIcon, QuestionIcon } from '@chakra-ui/icons'

// Import my utility modules and data structures

// <> Import my modules
import logoWhite from "/trivialEndeavorLogoWhite.svg";
import logoBlack from "/trivialEndeavorLogoBlack.svg"
import AppRow from "./components/structure/appRow";
import GameBoard from "./components/Gameboard";

export default function App(): JSX.Element {
  // <> Do the thing
  console.log(`Beginning rendering of Trivial Endeavor`);

  
  const { colorMode } = useColorMode()
  const logo = (colorMode === "dark") ? logoWhite : logoBlack

  return (
    <Center>
      <Box id="appContainer">
        <AppRow id="header">
          <Box id="logoBox">
            <Image id="app-logo" src={logo} p={5} px={10} alt="Trivial Endeavor logo" w='50vw' py="50px"/>
            <Text align={'right'}>by <Link href="https://www.schmincenzo.com" target="_blank" rel="noopener noreferrer">Schmincenzo</Link></Text>
          </Box>
        </AppRow>
        <GameBoard />
        <AppRow id="footer">
          <Center>
            <Box id="version" p="30px">
              <Image id="app-logo" src={logo} alt="Trivial Endeavor logo" w='300px' borderRadius={'3xl'} p={5} px={10}/>
              <Text>Version 2.0</Text>
            </Box>
            <Box id="links" p="30px">
              <Heading as="h3">Links</Heading>
              <List>
                <ListItem>
                  <ListIcon as={ExternalLinkIcon} />
                  <Link href="https://vpbasile.github.io/trivial-endeavor-2" isExternal>Live version</Link>
                </ListItem>
                <ListItem>
                  <ListIcon as={ExternalLinkIcon} />
                  <Link href="https://github.com/vpbasile/trivial-endeavor-2" isExternal>Repository on GitHub</Link>
                </ListItem>
                <ListItem>
                  <ListIcon as={QuestionIcon} />
                  <Link href="https://the-trivia-api.com/" isExternal>The Trivia API by Will Fry</Link>
                </ListItem>
              </List>
            </Box>
          </Center>
        </AppRow>
      </Box >
    </Center>
  );
}