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
    const { length } = useContext(GridContext);

    return (
        <aside className="w-72 flex-shrink-0 bg-neutral-950 p-8">
            <p>Rows</p>
            <section className="flex justify-between gap-4 align-middle">
                <button className="size-10 flex-shrink-0 rounded border-4 border-purple-500 bg-purple-800">
                    -
                </button>
                <p className="grid w-full place-items-center rounded border-4 border-neutral-500 bg-neutral-800">
                    {length}
                </p>
                <button className="size-10 flex-shrink-0 rounded border-4 border-purple-500 bg-purple-800">
                    +
                </button>
            </section>
            <section className="flex flex-wrap gap-2 py-8">
                <button onClick={() => rainbowTheme()}>Random</button>
                {Object.values(Themes).map((theme) => (
                    <button
                        className={`${theme} size-8 border-2 border-primary-border rounded bg-primary p-2`}
                        onClick={() => changeTheme(theme as Themes)}></button>
                ))}
            </section>
        </aside>
    );
}
