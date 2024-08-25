export const AppBar = () => {
    return (
        <div className="shadow-lg h-14 flex justify-between items-center bg-white">
            <div className="flex flex-col justify-center h-full ml-4">
                PayyTm App
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4 text-sm font-medium">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                    <div className="text-xl font-semibold">
                        U
                    </div>
                </div>
            </div>
        </div>
    );
};
