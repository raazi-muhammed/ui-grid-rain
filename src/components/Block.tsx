export function Block({ cell }: { cell: number }) {
    return (
        <div className="aspect-square w-full">
            <div className="h-full w-full bg-black">
                <div
                    style={{
                        opacity: cell > 0 ? cell : 1,
                    }}
                    className={`aspect-square w-full flex-shrink border-2 flex-grow rounded ${
                        cell > 0
                            ? "bg-primary border-primary-border transition-colors duration-1000"
                            : "bg-black border-black"
                    }`}></div>
            </div>
        </div>
    );
}
