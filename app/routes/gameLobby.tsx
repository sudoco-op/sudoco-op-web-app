
import { api } from "~/api/api";
import type { Route } from "./+types/gameLobby";
import { GameLobby } from "~/game/GameLobby";
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

export default function GameLobbyRoute({ loaderData }: Route.ComponentProps) {
    return <GameLobby gameData={loaderData} />;
}
