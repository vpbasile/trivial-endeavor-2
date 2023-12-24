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

/**
* Returns a promise and sleeps
*/
export function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }
