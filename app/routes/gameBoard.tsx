
import type { Route } from "./+types/gameBoard";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Sudoco-op" },
        { name: "description", content: "Play sudoku with your friends" },
    ];
}

export async function loader({ params } : Route.LoaderArgs) {
    // TODO: fech from the backend
    return { userList: ["user1"] }
}

export default function GameBoardRoute({ loaderData }: Route.ComponentProps) {
    return <div />;
}
