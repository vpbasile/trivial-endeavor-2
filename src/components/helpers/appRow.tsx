import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export default function AppRow(props: { children: React.ReactNode, border?:string, id?: string, headingText?: string }): React.ReactNode {
    // const breakBorders = { base:'3px solid red', sm: '3px solid green', md: '3px solid blue' };
    // const breakColor = useColorModeValue({base:'red.100',sm: 'green.100',md: 'blue.100'},{base:'red.900',sm: 'green.900',md: 'blue.900'})
    return (
        <Box id={props.id || "defaultID"} border={props.border} 
        display={{ sm: "flex" }} py={2} my={2} px={2} 
        // borderY={breakBorders} 
        // borderX={breakBorders} bg={breakColor}
        >
            {props.headingText && <Heading as='h2' size='xl'>{props.headingText}</Heading>}
            {props.children}
        </Box>
    )
}