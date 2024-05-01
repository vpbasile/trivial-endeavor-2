import { Button } from "@chakra-ui/react";

export function SameButton(
    props: {
        text: string,
        id?: string,
        key?: string,
        color?: string,
        isDisabled?: boolean,
        leftIcon?: JSX.Element,
        rightIcon?: JSX.Element,
        onClick?: () => void
    }) {
    return (<Button id={props.id} key={props.key}
        w={'100%'} whiteSpace={'normal'}
        py={4} px={2}
        alignContent={'center'}
        borderRadius={'lg'}
        colorScheme={props.color}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        isDisabled={props.isDisabled}
        onClick={props.onClick} >
        {props.text}
    </Button>)
}