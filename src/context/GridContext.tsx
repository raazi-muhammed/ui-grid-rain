import { createContext, ReactNode, useState } from "react";

const defaultValues = {
    length: 20,
    height: 15,
    setGrid: ({}: { length: number; height: number }) => {},
};
export const GridContext = createContext(defaultValues);

export default function GridContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [length, setLength] = useState(defaultValues.length);
    const [height, setHeight] = useState(defaultValues.height);

    function setGrid({ length, height }: { length: number; height: number }) {
        setLength(length);
        setHeight(height);
    }

    return (
        <GridContext.Provider value={{ length, height, setGrid }}>
            {children}
        </GridContext.Provider>
    );
}
