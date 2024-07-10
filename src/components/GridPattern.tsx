import { useEffect, useState } from "react";

export default function GridPattern() {
    const LENGTH = 20;
    const HEIGHT = 15;
    const GAME_SPEED = 3;
    const NUMBER_OF_NODES = 1;
    const NODE_LENGTH = 6;

    const createEmptyGrid = () =>
        Array.from({ length: LENGTH }, () => Array(HEIGHT).fill(0));

    const [grids, setGrids] = useState(createEmptyGrid());

    function createNewDrop() {
        setGrids((prevGrids) => {
            const newGrids = structuredClone(prevGrids);
            const randomColumn = Math.floor(Math.random() * LENGTH);
            newGrids[randomColumn][0] = 1;
            return newGrids;
        });
    }

    useEffect(() => {
        createNewDrop();

        const intervals: any[] = [];
        for (let i = 0; i < NUMBER_OF_NODES - 1; i++) {
            intervals.push(
                setTimeout(createNewDrop, ((i + 1) * 2 * 1000) / GAME_SPEED)
            );
        }

        return () => intervals.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        const gameTickDelay = Math.round(1000 / GAME_SPEED);

        const gameInterval = setInterval(() => {
            setGrids((prevGrids) => {
                const newGrids = structuredClone(prevGrids);
                const nodeIncrement = 1 / NODE_LENGTH;
                for (let col = 0; col < LENGTH; col++) {
                    for (let row = HEIGHT - 1; row >= 0; row--) {
                        let cellValue = newGrids[col][row];
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
    }, []);

    return (
        <main className="flex w-full container mx-auto h-svh">
            <aside className="w-72 flex-shrink-0 bg-neutral-950 p-8">
                <p>Rows</p>
                <section className="flex justify-between gap-4 align-middle">
                    <button className="size-10 flex-shrink-0 bg-purple-800 border-4 border-purple-500 rounded">
                        -
                    </button>
                    <p className="grid place-items-center w-full bg-neutral-800 rounded border-4 border-neutral-500">
                        {LENGTH}
                    </p>
                    <button className="size-10 flex-shrink-0 bg-purple-800 border-4 border-purple-500 rounded">
                        +
                    </button>
                </section>
            </aside>
            <section className="p-12 grid place-items-center w-full bg-neutral-900">
                <div
                    style={{
                        gridTemplateColumns: `repeat(${LENGTH}, minmax(0, 1fr))`,
                    }}
                    className="grid p-2 gap-1 my-auto h-fit w-full border-neutral-950 border-8">
                    {grids.map((row, i) => (
                        <div
                            key={i}
                            className="flex flex-col aspect-square gap-1">
                            {row.map((cell, j) => (
                                <div key={j} className="aspect-square w-full">
                                    {/* <div
                                        style={{
                                            opacity: cell > 0 ? cell : 1,
                                        }}
                                        className={`aspect-square w-full flex-shrink border-neutral-800 flex-grow ${
                                            cell > 0 ? "bg-red-500" : "bg-black"
                                        }`}>

                                        </div> */}
                                    <div className="bg-black  w-full h-full">
                                        <div
                                            style={{
                                                opacity: cell > 0 ? cell : 1,
                                            }}
                                            className={`aspect-square w-full flex-shrinkflex-grow ${
                                                cell > 0
                                                    ? "bg-red-500"
                                                    : "bg-black"
                                            }`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
