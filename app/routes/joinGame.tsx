import type { Route } from "./+types/joinGame";
import { JoinGame } from "~/game/JoinGame";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Sudoco-op" },
        { name: "description", content: "Play sudoku with your friends" },
    ];
}

export default function CreateGameRoute() {
    return <JoinGame />;
}
