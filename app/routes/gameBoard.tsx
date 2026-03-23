
import { GameBoard } from "~/game/GameBoard";
import type { Route } from "./+types/gameBoard";
import { api } from "~/api/api";
import { redirect } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Sudoco-op" },
        { name: "description", content: "Play sudoku with your friends" },
    ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
    try {
        const response = await api.getGameData(params.gameId);
        return response;
    }
    catch (e) {
        throw redirect("/");
    }
}

export default function GameBoardRoute({ loaderData }: Route.ComponentProps) {
    return <GameBoard initialGame={loaderData} />;
}
