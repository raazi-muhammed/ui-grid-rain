import { createContext, ReactNode, useState } from "react";

const defaultValues = {
    length: 25,
    height: 15,
};
export const GridContext = createContext(defaultValues);

export default function GridContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [length, setLength] = useState(defaultValues.length);
    const [height, setHeight] = useState(defaultValues.height);

    return (
        <GridContext.Provider value={{ length, height }}>
            {children}
        </GridContext.Provider>
    );
}
