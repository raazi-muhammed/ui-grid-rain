import { useContext, useEffect, useRef } from "react";
import { Block } from "./Block";
import { GridContext } from "../context/GridContext";

export default function GridPattern({ grids }: { grids: number[][] }) {
    const { length, height } = useContext(GridContext);

    const container = useRef<HTMLDivElement>();

    useEffect(() => {
        container.current?.scrollHeight;
        container.current?.scrollWidth;
        console.log(container.current?.clientHeight);
    }, [length, height]);

    return (
        <div
            ref={container as any}
            key={`${length}-${height}`}
            className="fill-side grid h-svh w-full place-items-center bg-neutral-900">
            <section
                style={{
                    maxWidth: `calc(${container.current?.scrollWidth}px - 5rem)`,
                    maxHeight: `calc(${container.current?.clientHeight}px - 8rem)`,
                    aspectRatio: length / height,
                }}
                className="grid place-items-center">
                <div
                    style={{
                        gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
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
        </div>
    );
}
