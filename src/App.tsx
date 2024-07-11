import GridPattern from "./components/GridPattern";
import SideBar from "./components/SideBar";
import { useEngine } from "./hooks/useEngine";
import { useTheme } from "./hooks/useTheme";

export default function App() {
    const { theme, changeTheme, rainbowTheme } = useTheme();
    const { grids } = useEngine();

    return (
        <main
            className={`${theme} container mx-auto flex flex-col-reverse lg:flex-row h-svh w-full`}>
            <SideBar changeTheme={changeTheme} rainbowTheme={rainbowTheme} />
            <GridPattern grids={grids} />
        </main>
    );
}
