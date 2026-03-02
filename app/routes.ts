import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/menu.tsx"),
    route("create-game", "routes/createGame.tsx"),
    route("join-game", "routes/joinGame.tsx")
] satisfies RouteConfig;
