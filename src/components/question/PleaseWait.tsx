import { Box, Progress } from '@chakra-ui/react';
type pleaseWaitProps = {
    colorScheme: string;
    children: React.ReactNode;
};

export default function PleaseWait(props: pleaseWaitProps) {
    const colorScheme = props.colorScheme
    return (<Box p={3} color={colorScheme}>
        <Progress isIndeterminate colorScheme={colorScheme}/>
        {props.children}
        <Progress isIndeterminate colorScheme={colorScheme} />
    </Box>)
}