/**
 * Programming Assignment 2
 * Joe Desmond
 *
 * Written in Typescript 4.2.4
 * Tested in Node v15.0.1
 */

import { gQuickSelect1, quickSelect1, quickSelect2 } from "./quickselect";
import { avgCalls, generateXs, time } from "./test";

function main(): void {
    implComparison(100000);
    console.log("\n");
    averageCalls(500, 50);
    console.log("\nQuiz");
    quiz(50000);
}

function implComparison(runs: number): void {
    let avgExplicitTime = 0; // Average time to execute for explicit 1-pivot quickselect
    let avgGeneralTime = 0; // Average time to execute for general 1-pivot quickselect

    console.log(`Testing 1-pivot quickselects with ${runs} runs on an array of 1000 elements finding a random largest element`);
    const xs = generateXs(1000, 1000, 0);
    for (let i = 0; i < runs; i++) {
        const k = Math.floor(Math.random() * 999) + 1;
        avgExplicitTime += time(() => quickSelect1(xs, k));
    }

    for (let i = 0; i < runs; i++) {
        const k = Math.floor(Math.random() * 999) + 1;
        avgGeneralTime += time(() => gQuickSelect1(xs, k));
    }

    avgExplicitTime /= runs;
    avgGeneralTime /= runs;

    console.log(`Avg. explicit quickselect time: ${avgExplicitTime} ms`);
    console.log(`Avg. general quickselect time: ${avgGeneralTime} ms`);
}

function averageCalls(n: number, k: number): void {
    console.log(`Average calls per algorithm for n=${n}, k=${k}:`);
    const onePivotCalls = avgCalls(n, k, 20000, quickSelect1);
    const twoPivotCalls = avgCalls(n, k, 20000, quickSelect2);

    console.log(`Average calls for 1-pivot: ${onePivotCalls}`);
    console.log(`Average calls for 2-pivot: ${twoPivotCalls}`);
}

function quiz(runs: number): void {
    console.log(`1-pivot, n=125, k=30: ${avgCalls(125, 30, runs, quickSelect1)}`);
    console.log(`1-pivot, n=225, k=20: ${avgCalls(225, 20, runs, quickSelect1)}`);
    console.log(`1-pivot, n=125, k=10: ${avgCalls(125, 10, runs, quickSelect1)}`);
    console.log(`1-pivot, n=225, k=40: ${avgCalls(225, 40, runs, quickSelect1)}`);
    console.log(`2-pivot, n=250, k=50: ${avgCalls(250, 50, runs, quickSelect2)}`);
    console.log(`2-pivot, n=125, k=10: ${avgCalls(125, 10, runs, quickSelect2)}`);
}

main();