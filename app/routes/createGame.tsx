import type { Route } from "./+types/createGame";
import { CreateGame } from "~/game/CreateGame";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Sudoco-op" },
        { name: "description", content: "Play sudoku with your friends" },
    ];
}

export default function CreateGameRoute() {
    return <CreateGame />;
}
