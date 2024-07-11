import { useRef, useState } from "react";

export enum Themes {
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

export function useTheme() {
    const [theme, setTheme] = useState(Themes.Violet);
    const setCurrentIdx = useState(0)[1];
    const intervalRef = useRef<any>();

    function rainbowTheme() {
        function changeColor() {
            const values = Object.values(Themes);
            setCurrentIdx((a) => {
                const next = a + 1 < values.length ? a + 1 : 1;
                setTheme(values[next]);
                return next;
            });
        }

        intervalRef.current = setInterval(() => {
            changeColor();
        }, 500);
    }

    function changeTheme(theme: Themes) {
        clearInterval(intervalRef.current);
        setTheme(theme);
    }
    return { theme, changeTheme, rainbowTheme };
}
