import { api, websocketEvents, type Game } from "~/api/api"
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUserId } from "~/auth/auth";
import { useNavigate, useOutletContext } from "react-router";
import type { WebsocketConnectionContext } from "./GameWebsocketProvider";

export const GameLobby = ({ gameData }: { gameData: Game }) => {
    const navigation = useNavigate();
    const [players, setPlayers] = useState(gameData.playerIds);

    const userId = useMemo(() => getUserId(), []);
    const isHost = useMemo(() => userId === gameData.playerIds[0], [gameData, userId]);

    const websocketConnection = useOutletContext<WebsocketConnectionContext>();

    useEffect(() => {
        if (websocketConnection) {
            websocketConnection.on(websocketEvents.ReciveNewPlayerJoined, (newPlayerId: string) => {
                console.log("player join")
                setPlayers(prev => [...prev, newPlayerId]);
            })

            websocketConnection.on(websocketEvents.ReciveStartGame, () => {
                console.log("start game");
                navigation(`/game-board/${gameData.id}`);
            })
        }

        return () => {
            websocketConnection?.off(websocketEvents.ReciveNewPlayerJoined);
            websocketConnection?.off(websocketEvents.ReciveStartGame);
        }
    }, [websocketConnection, gameData])

    const startGame = useCallback(async () => {
        await api.startGame(gameData.id);
    }, [gameData])

    return (
        <div className="min-h-screen w-screen bg-(--bg-main) flex flex-col justify-center items-center font-sans text-(--text-main) overflow-hidden transition-colors duration-300 ">
            {players.map((id, index) => (
                <div key={index} className={id === userId ? "text-[var(--primary)]" : ""}>
                    {`Player ${index + 1}`}
                </div>
            ))}
            <div>
                {gameData.code}
            </div>
            {isHost &&
                <button className="mt-80 border-4 border-[var(--border-color)] py-5 px-14 hover:cursor-pointer bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg"
                    onClick={startGame}
                >Start</button>
            }
        </div>
    )
}
