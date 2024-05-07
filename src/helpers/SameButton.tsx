import { Button, useColorModeValue } from "@chakra-ui/react";

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


    const fg = useColorModeValue('dark', 'light')
    const bg = useColorModeValue('light', 'dark')
    return (<Button id={props.id} key={props.id}
        w={'100%'} whiteSpace={'normal'}
        py={4} px={2}
        alignContent={'center'}
        borderRadius={'lg'}
        bg={props.color + '.' + bg}
        color={props.color + '.' + fg}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        isDisabled={props.isDisabled}
        onClick={props.onClick} >
        {props.text}
    </Button>)
}