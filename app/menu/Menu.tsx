import { Link } from "react-router";
import MenuSideBlock from "~/components/MenuSideBlock";

export function Menu() {
    return (
        <main className="w-screen h-screen flex flex-row gap-64 items-center justify-between">
            <div className="h-screen flex flex-col">
                <MenuSideBlock/>
            </div>
            <div className="h-screen flex flex-col gap-64 items-center justify-center">
                <h1 className="text-5xl">Sudoco-op</h1>
                <div className="flex flex-col gap-24">
                    <Link to={"/create-game"}>
                        <button className="p-4 bg-blue-700 rounded-xl hover:cursor-pointer hover:bg-blue-800">Create game</button>
                    </Link>
                    <Link to={"/join-game"}>
                        <button className="p-4 bg-blue-700 rounded-xl hover:cursor-pointer hover:bg-blue-800">Join game</button>
                    </Link>
                </div>
            </div>

        </main>
    );
}
