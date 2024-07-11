import { useContext, useEffect, useState } from "react";
import { GridContext } from "../context/GridContext";

const createEmptyGrid = (length: number, height: number) => {
    return Array.from({ length }, () => Array(height).fill(0));
};

export function useEngine() {
    const GAME_SPEED = 20;
    const NUMBER_OF_NODES = 6;
    const NODE_LENGTH = 6;

    const { length, height } = useContext(GridContext);
    const LENGTH = length;
    const HEIGHT = height;

    const [grids, setGrids] = useState<number[][]>([[]]);

    function createNewDrop() {
        setGrids((prevGrids) => {
            const newGrids = structuredClone(prevGrids);
            const randomColumn = Math.floor(Math.random() * LENGTH);
            newGrids[randomColumn][0] = 1;
            return newGrids;
        });
    }

    useEffect(() => {
        const gameTickDelay = Math.round(1000 / GAME_SPEED);
        const gameInterval = setInterval(() => {
            setGrids((prevGrids) => {
                const newGrids = structuredClone(prevGrids);
                const nodeIncrement = 1 / NODE_LENGTH;
                for (let col = 0; col < LENGTH; col++) {
                    for (let row = HEIGHT - 1; row >= 0; row--) {
                        let cellValue = newGrids?.[col]?.[row];
                        if (cellValue > 0) {
                            newGrids[col][row] =
                                cellValue > nodeIncrement
                                    ? cellValue - nodeIncrement
                                    : 0;

                            const nextRow = row + 1;
                            if (nextRow < HEIGHT) {
                                newGrids[col][nextRow] = cellValue;
                            } else if (cellValue === 1) {
                                createNewDrop();
                            }
                        }
                    }
                }

                return newGrids;
            });
        }, gameTickDelay);

        return () => clearInterval(gameInterval);
    }, [height, length]);

    useEffect(() => {
        setGrids(createEmptyGrid(length, height));

        createNewDrop();
        const intervals: any[] = [];
        for (let i = 0; i < NUMBER_OF_NODES - 1; i++) {
            intervals.push(
                setTimeout(createNewDrop, ((i + 1) * 2 * 1000) / GAME_SPEED)
            );
        }
        return () => intervals.forEach(clearTimeout);
    }, [length, height]);

    return { grids };
}
