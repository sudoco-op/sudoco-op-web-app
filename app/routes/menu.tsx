import type { Route } from "./+types/menu";
import { Menu } from "../menu/Menu";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Sudoco-op" },
        { name: "description", content: "Play sudoku with your friends" },
    ];
}

export default function MenuRoute() {
    return <Menu />;
}
