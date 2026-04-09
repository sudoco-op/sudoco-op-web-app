import { api, websocketEvents, type Game } from "~/api/api"
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUserId } from "~/auth/auth";
import { useNavigate, useOutletContext } from "react-router";
import type { WebsocketConnectionContext } from "./GameWebsocketProvider";
import {Copy} from "lucide-react"

import FooterBlock from "~/components/FooterBlock";
import HeaderBlock from "~/components/HeaderBlock";
import LobbyPlayerCard from "~/components/LobbyPlayerCard";

export const GameLobby = ({ gameData }: { gameData: Game }) => {
    const navigation = useNavigate();
    const [players, setPlayers] = useState(gameData.playerIds);

    const userId = useMemo(() => getUserId(), []);
    const isHost = useMemo(() => userId === gameData.playerIds[0], [gameData, userId]);

    const [copied, setCopied] = useState(false);

    const websocketConnection = useOutletContext<WebsocketConnectionContext>();

    useEffect(() => {
        if (gameData.boardState.length != 0) navigation(`/game-board/${gameData.id}`);

        if (websocketConnection) {
            websocketConnection.on(websocketEvents.ReciveNewPlayerJoined, (newPlayerId: string) => {
                setPlayers(prev => [...prev, newPlayerId]);
            })

            websocketConnection.on(websocketEvents.ReciveStartGame, () => {
                navigation(`/game-board/${gameData.id}`);
            })
        }

        return () => {
            websocketConnection?.off(websocketEvents.ReciveNewPlayerJoined);
            websocketConnection?.off(websocketEvents.ReciveStartGame);
        }
    }, [websocketConnection, gameData])

    const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gameData.code);
      setCopied(true);
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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
            <HeaderBlock confirmExit></HeaderBlock>
            <div className="
            min-h-20 h-auto w-auto max-w-[60%]
            bg-(--bg-sidebar)
            flex flex-wrap justify-center items-center gap-4 p-1 border-2 rounded-lg border-(--border-color)">
                {players.map((id, index) => (
                    <LobbyPlayerCard
                        key={id}
                        number={index + 1}
                        isMe={id === userId}
                    />
                ))}
            </div>

            <div className="
            h-auto w-auto
            bg-(--accent)
            flex flex-row justify-center p-3 rounded-2xl text-2xl font-bold items-center gap-5 flex-nowrap cursor-pointer 
            hover:scale-120 transition-transform"
            onClick={handleCopy}>
                <div>{copied? "Copied!" : gameData.code}</div>
                <div><Copy size={30}/></div>
            </div>
            {isHost &&
                <button className=" border-4 border-[var(--border-color)] py-5 px-14 font-bold text-2xl hover:cursor-pointer bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg"
                    onClick={startGame}
                >Start</button>
            }
            <FooterBlock confirmExit></FooterBlock>

        </div>
    )
}
