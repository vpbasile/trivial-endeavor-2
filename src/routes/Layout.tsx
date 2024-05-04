import { ExternalLinkIcon, QuestionIcon } from '@chakra-ui/icons';
import { Box, Center, Heading, Image, Link, List, ListIcon, ListItem, Text, useColorMode } from '@chakra-ui/react';
import AppRow from '../components/helpers/appRow';

import logoBlack from "/trivialEndeavorLogoBlack.svg";
import logoWhite from "/trivialEndeavorLogoWhite.svg";

// FIXME: Put this file in a better place
import { Outlet } from 'react-router-dom';
import packageJson from '../../package.json';
import ColorModeButton from '../components/helpers/ColorModeButton';

export default function RootRoute() {

    console.log(`Beginning rendering of Trivial Endeavor`);
    console.log(`Version ${packageJson.version}`);

    const { colorMode } = useColorMode()
    const logo = (colorMode === "dark") ? logoWhite : logoBlack

    return (<Box id="appContainer" maxWidth={'100%'}>
        <AppRow id="head">
            <Center id="logoBox" w={'full'}>
                <Image id="app-logo" alt="Trivial Endeavor logo" src={logo} w={{ base: '90%', sm: '50%' }} />
            </Center>
        </AppRow>
        <AppRow id="body">
            <Outlet />
        </AppRow>
        <AppRow id="foot">
            <Box display={{ sm: 'flex' }}>
                <Center id="version">
                    <ColorModeButton />
                    <Image id="app-logo" src={logo} alt="Trivial Endeavor logo" w='300px' borderRadius={'3xl'} p={5} px={10} />
                    <Text>Version {packageJson.version}</Text>
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
                            Using questions from <Link href='https://the-trivia-api.com/'>The Trivia API</Link>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </AppRow>
    </Box >)
}