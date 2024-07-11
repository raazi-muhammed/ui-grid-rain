import { useEffect, useState } from "react";

enum Themes {
    Neutral = "neutral",
    Red = "red",
    Amber = "amber",
    Lime = "lime",
    Emerald = "emerald",
    Cyan = "cyan",
    Blue = "blue",
    Violet = "violet",
    Fuchsia = "fuchsia",
    Rose = "rose",
}

function Block({ cell }: { cell: number }) {
    return (
        <div className="aspect-square w-full">
            <div className="h-full w-full bg-black">
                <div
                    style={{
                        opacity: cell > 0 ? cell : 1,
                    }}
                    className={`aspect-square w-full flex-shrink border-2 flex-grow rounded ${
                        cell > 0
                            ? "bg-primary border-primary-border transition-colors duration-1000"
                            : "bg-black border-black"
                    }`}></div>
            </div>
        </div>
    );
}
export default function GridPattern() {
    const LENGTH = 30;
    const HEIGHT = 15;
    const GAME_SPEED = 20;
    const NUMBER_OF_NODES = 6;
    const NODE_LENGTH = 6;

    const createEmptyGrid = () =>
        Array.from({ length: LENGTH }, () => Array(HEIGHT).fill(0));

    const [grids, setGrids] = useState(createEmptyGrid());
    const [theme, setTheme] = useState(Themes.Violet);
    const setCurrentIdx = useState(0)[1];
    function createNewDrop() {
        setGrids((prevGrids) => {
            const newGrids = structuredClone(prevGrids);
            const randomColumn = Math.floor(Math.random() * LENGTH);
            newGrids[randomColumn][0] = 1;
            return newGrids;
        });
    }

    useEffect(() => {
        function changeColor() {
            const values = Object.values(Themes);
            setCurrentIdx((a) => {
                const next = a + 1 < values.length ? a + 1 : 1;
                setTheme(values[next]);
                console.log(next, values.length);

                return next;
            });
        }

        setInterval(() => {
            changeColor();
        }, 500);
    }, []);

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
        <main className={`${theme} container mx-auto flex h-svh w-full`}>
            <aside className="w-72 flex-shrink-0 bg-neutral-950 p-8">
                <p>Rows</p>
                <section className="flex justify-between gap-4 align-middle">
                    <button className="size-10 flex-shrink-0 rounded border-4 border-purple-500 bg-purple-800">
                        -
                    </button>
                    <p className="grid w-full place-items-center rounded border-4 border-neutral-500 bg-neutral-800">
                        {LENGTH}
                    </p>
                    <button className="size-10 flex-shrink-0 rounded border-4 border-purple-500 bg-purple-800">
                        +
                    </button>
                </section>
                <section className="flex flex-wrap gap-2 py-8">
                    {Object.values(Themes).map((a) => (
                        <button
                            className={`${a} size-8 border-2 border-primary-border rounded bg-primary p-2`}
                            onClick={() => setTheme(a as Themes)}></button>
                    ))}
                </section>
            </aside>
            <section className="grid w-full place-items-center bg-neutral-900 p-12">
                <div
                    style={{
                        gridTemplateColumns: `repeat(${LENGTH}, minmax(0, 1fr))`,
                    }}
                    className="my-auto grid h-fit w-full gap-1 border-8 border-neutral-950 p-2">
                    {grids.map((row, i) => (
                        <div
                            key={i}
                            className="flex aspect-square flex-col gap-1">
                            {row.map((cell, j) => (
                                <div key={j}>
                                    <Block key={`${i}-${cell}`} cell={cell} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
