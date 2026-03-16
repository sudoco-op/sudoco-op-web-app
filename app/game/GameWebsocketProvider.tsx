import { HubConnectionBuilder, type HubConnection } from "@microsoft/signalr";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getUserToken } from "~/auth/auth";

export type WebsocketConnectionContext = HubConnection | null;

const GameWebsocketProvider = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5254/game-hub", {
                accessTokenFactory: () => {
                    const token = getUserToken();
                    return token ? token : "";
                }
            })
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(() => {
                setConnection(newConnection);
            })
            .catch((err: Error) => {
                console.error("SignalR Startup Error: ", err);
            });

        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        }
    }, []);

    return (
        <Outlet context={connection} />
    );
}

export default GameWebsocketProvider;