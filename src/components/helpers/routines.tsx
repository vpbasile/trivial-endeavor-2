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
