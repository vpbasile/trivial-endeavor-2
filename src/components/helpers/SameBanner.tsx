import { Card, CardBody } from "@chakra-ui/react";

export function SameBanner(
    props: {
        text: string,
        id?: string,
        key?: string,
        color?: string
        children?: JSX.Element
    }) {
    return <>
        <Card id={props.id} key={props.id}
            w={'100%'} whiteSpace={'normal'}
            // p={2}
            alignContent={'center'}
            borderRadius={'lg'}
            colorScheme={props.color + '.200'}
        >
            <CardBody>{props.children || props.text}</CardBody>
        </Card>
    </>
}