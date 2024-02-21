import {iRowCol} from "./data/DomainModel.tsx";


export function map1Dto2Darray<T extends iRowCol>(input: T[]): (T | null)[][] {
    const rows = input.map((i) => i.row);

    const maxRow = Math.max(...rows);
    let output: (T | null)[][] = []
    for (let y = 0; y < maxRow + 1; y++) {
        output[y] = [];

        const cols = input.filter((i) => i.row == y).map((i) => i.column);
        const maxCol = Math.max(...cols);

        for (let x = 0; x < maxCol + 1; x++) {
            output[y][x] = null;
        }
    }

    for (const i of input) {
        output[i.row][i.column] = i;
    }

    return output;
}