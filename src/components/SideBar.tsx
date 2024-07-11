import { useContext } from "react";
import { Themes } from "../hooks/useTheme";
import { GridContext } from "../context/GridContext";

export default function SideBar({
    rainbowTheme,
    changeTheme,
}: {
    changeTheme: (theme: Themes) => void;
    rainbowTheme: () => void;
}) {
    const { setGrid, length, height } = useContext(GridContext);

    return (
        <aside className="w-72 flex-shrink-0 bg-neutral-950 p-8">
            <p>Grid size</p>
            <section className="grid w-full grid-cols-6 gap-4">
                {[...new Array(6)].map((_, i) => (
                    <div className="flex w-full flex-col justify-between gap-4">
                        {[...new Array(4)].map((_, j) => (
                            <div
                                onClick={() => {
                                    console.log((i + 1) * 5, (j + 1) * 5);
                                    setGrid({
                                        length: (i + 1) * 5,
                                        height: (j + 1) * 5,
                                    });
                                }}
                                style={{
                                    opacity:
                                        length <= i * 5 || height <= j * 5
                                            ? 0.5
                                            : 1,
                                }}
                                className="aspect-square rounded border-2 border-neutral-50 bg-neutral-500 text-transparent">
                                .
                            </div>
                        ))}
                    </div>
                ))}
            </section>
            <p className="mt-6">Colors</p>
            <section className="flex flex-wrap justify-between gap-3">
                <button
                    className="h-8 w-full rounded border-2 border-primary-border bg-primary transition-colors duration-1000"
                    onClick={() => rainbowTheme()}>
                    Random
                </button>
                {Object.values(Themes).map((theme) => (
                    <button
                        className={`${theme} size-8 border-2 border-primary-border rounded bg-primary p-2`}
                        onClick={() => changeTheme(theme as Themes)}></button>
                ))}
            </section>
        </aside>
    );
}
