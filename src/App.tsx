
// Import ChakraUI elements
import { Box, Text, Link, Image, Center, useColorMode, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'

// Import my utility modules and data structures

// <> Import my modules
import logoWhite from "/trivialEndeavorLogoWhite.svg";
import logoBlack from "/trivialEndeavorLogoBlack.svg"
import AppRow from "./components/helpers/appRow";
import GameBoard from "./components/Gameboard";
import { ExternalLinkIcon, QuestionIcon } from '@chakra-ui/icons';

export default function App(): JSX.Element {
  // <> Do the thing
  console.log(`Beginning rendering of Trivial Endeavor`);


  const { colorMode } = useColorMode()
  const logo = (colorMode === "dark") ? logoWhite : logoBlack

  return (
    <Center>
      <Box id="appContainer" maxWidth={'100%'}>
        <AppRow id="header">
          <Center id="logoBox" w={'full'}>
            <Image id="app-logo" alt="Trivial Endeavor logo" src={logo} w={{ base: '90%', sm: '50%' }} />
            
          </Center>
        </AppRow>
        <GameBoard />
        <AppRow id="footer">
          <Box display={{ sm: 'flex' }}>
            <Center id="version">
              <Image id="app-logo" src={logo} alt="Trivial Endeavor logo" w='300px' borderRadius={'3xl'} p={5} px={10} />
              <Text>Version 2.1</Text>
            </Center>
            <Box id="links" justifyContent={'center'}>
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
          </Box>
        </AppRow>
      </Box >
    </Center>
  );
}