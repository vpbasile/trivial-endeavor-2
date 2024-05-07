import { Card, CardBody, useColorModeValue } from "@chakra-ui/react";

export function SameBanner(
    props: {
        text: string,
        id?: string,
        key?: string,
        categoryTag?: string
        children?: JSX.Element
    }) {

    const fg = useColorModeValue('light', 'dark')
    const bg = useColorModeValue('dark', 'light')

    return <>
        <Card id={props.id} key={props.id}
            w={'100%'} whiteSpace={'normal'}
            // p={2}
            alignContent={'center'}
            borderRadius={'lg'}
            bg={props.categoryTag + '.' + bg}
            color={props.categoryTag + '.' + fg}
        >
            <CardBody>{props.children || props.text}</CardBody>
        </Card>
    </>
}