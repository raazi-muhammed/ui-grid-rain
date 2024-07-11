import { useContext } from "react";
import { Block } from "./Block";
import { GridContext } from "../context/GridContext";

export default function GridPattern({ grids }: { grids: number[][] }) {
    const { length } = useContext(GridContext);
    return (
        <section className="grid w-full place-items-center bg-neutral-900 p-12">
            <div
                style={{
                    gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
                }}
                className="my-auto grid h-fit w-full gap-1 border-8 border-neutral-950 p-2">
                {grids.map((row, i) => (
                    <div key={i} className="flex aspect-square flex-col gap-1">
                        {row.map((cell, j) => (
                            <div key={j}>
                                <Block key={`${i}-${cell}`} cell={cell} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
