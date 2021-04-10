
/**
 * The kth largest element, and the number of recursive calls made.
 */
export type Result = {
    kth: number;
    calls: number;
}

/**
 * QuickSelect function signature
 */
export type QuickSelect = (xs: number[], k: number) => Result;

/**
 * Pivot chooser heuristic function. Takes an unsorted array, a `k` in the array's set of indices, and returns an array of pivots (not pivot indices).
 * The pivots do not have to be sorted.
 */
export type PivotChooser = (xs: number[], k: number) => number[];

/**
 * Picks a random pivot in xs.
 *
 * @param xs unsorted array
 * @param k unused
 * @returns 1 pivot
 */
export function oneRandomPivot(xs: number[], k?: number): number[] {
    const pivotI = Math.floor(Math.random() * xs.length);
    return [xs[pivotI]];
}

/**
 * Picks two random pivots in xs. If xs has only one element, returns that element (in an array).
 *
 * @param xs unsorted array
 * @param k unused
 * @returns two pivots, or one if xs has a length of 1
 */
export function twoRandomPivots(xs: number[], k?: number): number[] {
    if (xs.length === 1) {
        return [xs[0]];
    }

    const pivotI1 = Math.floor(Math.random() * xs.length);
    let pivotI2 = pivotI1;

    while (pivotI2 === pivotI1) {
        pivotI2 = Math.floor(Math.random() * xs.length);
    }

    return [xs[pivotI1], xs[pivotI2]];
}

/**
 * General quickselect with a pivot chooser heuristic. The heuristic function chooses pivots as a function of xs and k, and it
 * can return multiple pivots. xs is split around the pivot(s), so that for two succesive pivots a and b (with a < b), `ys` contains an array of elements
 * greater than a and less than b. ys also contains an array of elements less than the smallest pivot, and an array of elements greater than the largest pivot.
 *
 * The algorithm walks back (from the greatest pivot to the smallest) to determine which array in ys contains the kth largest element. If the kth largest element falls
 * on one of the pivots, the algorithm returns the pivot.
 *
 * @param xs unsorted array
 * @param k k in "kth largest element"
 * @param pChooser pivot chooser heuristic
 * @returns kth largest element in xs, with the number of recursive calls made
 */
export function generalQuickSelect(xs: number[], k: number, pChooser: PivotChooser): Result {
    const ps = pChooser(xs, k);
    ps.sort((a, b) => a - b);

    const ys: number[][] = [];

    for (let i = 0; i < ps.length + 1; i++) {
        ys.push([]);
    }

    for (const x of xs) {
        let p = 0;

        for (let i = 0; i < ps.length; i++) {
            p = ps[i];

            if (x < p && (i === 0 || ps[i - 1] !== x)) {
                ys[i].push(x);
                break;
            }
        }

        if (x > p) {
            ys[ps.length].push(x);
        }
    }

    let accumulatedLen = 0;
    for (let i = ps.length; i > 0; i--) {
        const p = ps[i - 1];
        const zs = ys[i];
        const effectiveLen = accumulatedLen + zs.length;

        if (k <= effectiveLen) {
            const { kth, calls } = generalQuickSelect(zs, k - accumulatedLen, pChooser);

            return {
                kth,
                calls: calls + 1,
            };
        } else if (k === effectiveLen + 1) {
            return {
                kth: p,
                calls: 1,
            };
        }

        accumulatedLen += (1 + zs.length);
    }

    const { kth, calls } = generalQuickSelect(ys[0], k - accumulatedLen, pChooser);

    return {
        kth,
        calls: calls + 1,
    };
}

/**
 * Quickselect with 1 randomly chosen pivot.
 *
 * @param xs unsorted array
 * @param k k in "kth largest number"
 * @returns the kth largest number in xs with the number of recursive calls made
 */
export function quickSelect1(xs: number[], k: number): Result {
    const pivotI = Math.floor(Math.random() * xs.length);
    const pivot = xs[pivotI];
    const small = [];
    const large = [];

    for (const x of xs) {
        if (x < pivot) {
            small.push(x);
        } else if (x > pivot) {
            large.push(x);
        }
    }

    if (k <= large.length) {
        const { kth, calls } = quickSelect1(large, k);

        return {
            kth,
            calls: calls + 1,
        };
    } else if (k === large.length + 1) {
        return {
            kth: pivot,
            calls: 1,
        }
    } else {
        const { kth, calls } = quickSelect1(small, k - large.length - 1);

        return {
            kth,
            calls: calls + 1,
        };
    }
}

/**
 * Quickselect with 2 randomly chosen pivots.
 *
 * @param xs unsorted array
 * @param k k in "kth largest element"
 * @returns the kth largest element in xs, and the number of recursive calls made
 */
export function quickSelect2(xs: number[], k: number): Result {
    return generalQuickSelect(xs, k, twoRandomPivots);
}

/**
 * Quickselect with 1 randomly chosen pivot, using the general implementation.
 *
 * @param xs unsorted array
 * @param k k in "kth largest element"
 * @returns the kth largest element in xs, and the number of recursive calls made
 */
export function gQuickSelect1(xs: number[], k: number): Result {
    return generalQuickSelect(xs, k, oneRandomPivot);
}
