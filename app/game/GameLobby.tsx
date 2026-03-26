import { api, websocketEvents, type Game } from "~/api/api"
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUserId } from "~/auth/auth";
import { useNavigate, useOutletContext } from "react-router";
import type { WebsocketConnectionContext } from "./GameWebsocketProvider";

import FooterBlock from "~/components/FooterBlock";
import HeaderBlock from "~/components/HeaderBlock";
import LobbyPlayerCard from "~/components/LobbyPlayerCard";

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

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    return (
        <div className="
        min-h-screen w-screen        
        animate-float-bg bg-radial-[at_var(--bg-pos)_50%] from-(--bg-main) to-(--bg-card)
        flex flex-col justify-between items-center font-sans text-(--text-main) overflow-hidden transition-colors duration-300 ">
            <HeaderBlock />
            {players.map((id, index) => (
                <LobbyPlayerCard
                    key={id} 
                    number={index + 1}
                    isMe={id === userId}
                />
            ))}
            <div>
                {gameData.code}
            </div>
            {isHost &&
                <button className="mt-80 border-4 border-[var(--border-color)] py-5 px-14 hover:cursor-pointer bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg"
                    onClick={startGame}
                >Start</button>
            }
            <FooterBlock />
        </div>
    )
}
