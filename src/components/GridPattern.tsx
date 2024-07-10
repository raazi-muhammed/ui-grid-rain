import { useEffect, useState } from "react";

export default function GridPattern() {
    const LENGTH = 20;
    const HEIGHT = 15;
    const GAME_SPEED = 2;

    const createEmptyGrid = () =>
        Array.from({ length: LENGTH }, () => Array(HEIGHT).fill(0));

    const [grids, setGrids] = useState(createEmptyGrid());

    function createNewDrop() {
        setGrids((prevGrids) => {
            const newGrids = prevGrids.map((row) => row.slice());
            const randomColumn = Math.floor(Math.random() * LENGTH);
            newGrids[randomColumn][0] = 1;
            return newGrids;
        });
    }

    useEffect(() => {
        createNewDrop();
        const intervals = [
            setTimeout(createNewDrop, (4 * 1000) / GAME_SPEED),
            setTimeout(createNewDrop, (2 * 1000) / GAME_SPEED),
        ];

        return () => intervals.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        const gameTickDelay = Math.round(1000 / GAME_SPEED);

        const gameInterval = setInterval(() => {
            setGrids((prevGrids) => {
                const newGrids = structuredClone(prevGrids);

                for (let col = 0; col < LENGTH; col++) {
                    for (let row = HEIGHT - 1; row >= 0; row--) {
                        if (newGrids[col][row] > 0) {
                            newGrids[col][row] = 0;

                            const nextRow = row + 1;
                            if (nextRow < HEIGHT) {
                                newGrids[col][nextRow] = 1;
                            } else {
                                createNewDrop();
                            }
                        }
                    }
                }

                return newGrids;
            });
        }, gameTickDelay);

        return () => clearInterval(gameInterval);
    }, []);

    return (
        <main className="flex">
            {grids.map((row, i) => (
                <div key={i} className="flex flex-col">
                    {row.map((cell, j) => (
                        <div
                            key={j}
                            className={`size-12 border-4 ${
                                cell > 0 ? "border-red-500" : "border-slate-500"
                            }`}>
                            {i},{j}
                        </div>
                    ))}
                </div>
            ))}
        </main>
    );
}
