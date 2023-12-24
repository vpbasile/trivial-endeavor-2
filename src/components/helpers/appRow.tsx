import { Center, Heading } from "@chakra-ui/react";
import React from "react";
import { newBreaks } from "./style";

export default function AppRow(props: { children: React.ReactNode, border?:string, id?: string, headingText?: string }): React.ReactNode {
    // const breakBorders = { base:'3px solid red', sm: '3px solid green', md: '3px solid blue' };
    // const breakColor = useColorModeValue({base:'red.100',sm: 'green.100',md: 'blue.100'},{base:'red.900',sm: 'green.900',md: 'blue.900'})
    return (
        <Center id={props.id || "defaultID"} border={props.border}
        maxWidth={newBreaks}
        display={{ sm: "flex" }} py={4} px={2} 
        alignContent={'center'}
        >
            {props.headingText && <Heading as='h2' size='xl'>{props.headingText}</Heading>}
            {props.children}
        </Center>
    )
}