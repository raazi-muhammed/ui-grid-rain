import { ReactNode, useContext } from "react";
import { Themes } from "../hooks/useTheme";
import { GridContext } from "../context/GridContext";

function Heading({ children }: { children: ReactNode }) {
    return <p className="mt-8">{children}</p>;
}

function GridSizeSetting() {
    const { setGrid, length, height } = useContext(GridContext);

    return (
        <section className="grid aspect-square w-full max-w-72 grid-cols-6 gap-1">
            {[...new Array(6)].map((_, i) => (
                <div className="flex w-full flex-col justify-between gap-1">
                    {[...new Array(6)].map((_, j) => {
                        const inActive = length <= i * 5 || height <= j * 5;
                        return (
                            <button
                                onClick={() => {
                                    console.log((i + 1) * 5, (j + 1) * 5);
                                    setGrid({
                                        length: (i + 1) * 5,
                                        height: (j + 1) * 5,
                                    });
                                }}
                                className={`aspect-square rounded border-2 text-transparent ${
                                    inActive
                                        ? "bg-neutral-800 border-neutral-700"
                                        : "bg-neutral-500 border-neutral-50"
                                }`}></button>
                        );
                    })}
                </div>
            ))}
        </section>
    );
}

export default function SideBar({
    rainbowTheme,
    changeTheme,
}: {
    changeTheme: (theme: Themes) => void;
    rainbowTheme: () => void;
}) {
    return (
        <aside className="grid h-fit w-full flex-shrink-0 grid-cols-2 gap-4 bg-neutral-950 p-8 lg:w-72 lg:grid-cols-1">
            <div>
                <Heading>Grid size</Heading>
                <GridSizeSetting />
            </div>
            <div>
                <Heading>Colors</Heading>
                <section className="grid grid-cols-5 flex-wrap justify-between gap-3">
                    <button
                        className="col-span-5 h-8 w-full rounded border-2 border-primary-border bg-primary transition-colors duration-1000"
                        onClick={() => rainbowTheme()}>
                        Random
                    </button>
                    {Object.values(Themes).map((theme) => (
                        <button
                            className={`${theme} aspect-square border-2 border-primary-border rounded bg-primary p-2`}
                            onClick={() =>
                                changeTheme(theme as Themes)
                            }></button>
                    ))}
                </section>
            </div>
        </aside>
    );
}
