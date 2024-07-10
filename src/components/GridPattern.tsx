import { useEffect, useState } from "react";

export default function GridPattern() {
    const LENGTH = 15;
    const HEIGHT = 20;
    const GAME_SPEED = 1;
    const [girds, setGrids] = useState(
        new Array(LENGTH).fill(new Array(HEIGHT).fill(0))
    );

    function createNewDrop() {
        setGrids((g) => {
            const ng = JSON.parse(JSON.stringify(g));
            const nl = Math.floor(Math.random() * LENGTH);
            ng[nl][0] = 1;
            return ng;
        });
    }

    useEffect(() => {
        createNewDrop();
        setTimeout(() => {
            createNewDrop();
        }, 7000);
        setTimeout(() => {
            createNewDrop();
        }, 2000);
    }, []);
    useEffect(() => {
        const movementDelay: number = Math.round(1000 / GAME_SPEED);
        console.log({ movementDelay });

        const gameInterval: any = setInterval(
            () =>
                setGrids((g) => {
                    const ng = JSON.parse(JSON.stringify(g));
                    for (let i = 0; i < LENGTH; i++) {
                        for (let j = HEIGHT - 1; j >= 0; j--) {
                            const val = ng[i][j];
                            if (val > 0) {
                                ng[i][j] = 0;

                                const newIndex = j + 1;
                                if (newIndex < HEIGHT) {
                                    ng[i][newIndex] = 1;
                                } else createNewDrop();
                            }
                        }
                    }
                    return ng;
                }),
            movementDelay
        );
    }, []);
    return (
        <main className="flex">
            {girds.map((row, i) => (
                <div className="flex flex-col">
                    {row.map((_: any, j: number) => (
                        <>
                            {girds[i][j] > 0 ? (
                                <div className="size-12 border-4 border-red-500">
                                    {i},{j}
                                </div>
                            ) : (
                                <div className="size-12 border-4 border-slate-500">
                                    {i},{j}
                                </div>
                            )}
                        </>
                    ))}
                </div>
            ))}
        </main>
    );
}
