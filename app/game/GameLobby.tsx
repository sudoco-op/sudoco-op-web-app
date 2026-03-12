import { websocketEvents, type Game } from "~/api/api"
import { useSignalR } from "./GameWebsocketProvider"
import { useEffect, useState } from "react";

export const GameLobby = ({ gameData }: { gameData: Game }) => {
    const [players, setPlayers] = useState(gameData.playerIds);
    const websocketConnection = useSignalR();
    useEffect(() => {
        if (websocketConnection) {
            websocketConnection.on(websocketEvents.ReciveNewPlayerJoined, (newPlayerId: string) => {
                setPlayers(prev => [...prev, newPlayerId]);
            })
        }

    }, [websocketConnection])

    return (
        <div className="min-h-screen w-screen bg-(--bg-main) flex flex-col justify-center items-center font-sans text-(--text-main) overflow-hidden transition-colors duration-300 ">
            {players.map((id, index) => (
                <div>
                    {`Player ${index + 1}`}
                </div>
            ))}
        </div>
    )
}
