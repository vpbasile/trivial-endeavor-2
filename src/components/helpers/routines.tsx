import { Button } from "@chakra-ui/react";
import { category } from "../gameReducer";
import { newBreaks } from "./style";

/**
* Shuffles an array of four strings
*/
export function shuffleArray(array: string[]): string[] {
    let curId: number = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        const randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        const tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}


/**
* Returns first, second, thrd, or last
*/
export function ordinal(number: number): "first" | "second" | "third" | "last" {
    switch (number) {
        case 1: return "first";
        case 2: return "second";
        case 3: return "third";
        default: return "last";
    }
}

export function winnerColor(place: number) {
	switch (place) {
		case 1: return "yellow";
		case 2: return "cyan";
		case 3: return "orange";
	}
}

/**
* Returns a promise and sleeps
*/
export function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

export function wrapHeading(text:string, color?: string, key?:string) { return < Button id='displayMessage' isDisabled w={'100%'} whiteSpace={'normal'} colorScheme={color} borderRadius={'lg'} maxW={newBreaks} key={key}> {text}</Button >
     }

//Return the category object given its queryTag
export function getCategory(categoryList: category[], tag: string): category {
    const filteredList: category[] = categoryList.filter((categoryTemp) => {
        return categoryTemp.queryTag === tag;
    });
    return filteredList[0];
}