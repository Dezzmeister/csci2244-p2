import { QuickSelect } from "./quickselect";

export function generateXs(len: number, range: number, offset: number) {
    const xs = [];

    while (xs.length < len) {
        const rand = Math.floor(Math.random() * range + offset);
        if (xs.indexOf(rand) === -1) {
            xs.push(rand);
        }
    }

    return xs;
}

export function avgCalls(xsLen: number, k: number, runs: number, algo: QuickSelect): number {
    const xs = generateXs(xsLen, xsLen, 0);
    let totalCalls = 0;

    for (let i = 0; i < runs; i++) {
        const { calls } = algo(xs, k);

        totalCalls += calls;
    }

    return totalCalls / runs;
}

export function time(func: () => void): number {
    const start = Date.now();
    func();
    return (Date.now() - start);
}