import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { propsType } from '../gameReducer';
export default function NextTurnButton(props: propsType) {
    const { dispatch } = props;
    return (<Box py={2}>
        <Button
            rightIcon={<ArrowForwardIcon />}
            whiteSpace={'normal'}
            w={'100%'}
            variant={'outline'}
            onClick={() => dispatch({ type: 'phase_next_player' })}>Next Turn</Button>
    </Box>)
}