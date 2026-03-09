import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/menu.tsx"),
    route("create-game", "routes/createGame.tsx"),
    route("join-game", "routes/joinGame.tsx"),
    layout("./game/GameWebsocketProvider.tsx", [
        route("game-lobby/:gameId","routes/gameLobby.tsx"),
        route("game-board/:gameId", "routes/gameBoard.tsx")
    ])
] satisfies RouteConfig;
