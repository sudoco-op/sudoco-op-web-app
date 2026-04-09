import axios from "axios";

export type BoardCell = {
    cellValue: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    isCorrect: boolean;
    cellNotes: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[];
}

export type Game = {
    id: string;
    code: string;
    livesLeft: number;
    playerIds: string[];
    boardState: BoardCell[];
}

export type CreateGameResponse = {
    userJwt: string;
    game: Game;
}

export type JoinGameResponse = CreateGameResponse;

export const API_URL = import.meta.env.VITE_API_URL;

export const api = {
    createGame: async (difficulty: number): Promise<CreateGameResponse> => {
        const response = await axios.post(`${API_URL}/GamesControler/create?difficulty=${difficulty}`);
        return response.data;
    },
    joinGame: async (gameCode: string): Promise<JoinGameResponse> => {
        const response = await axios.post(`${API_URL}/GamesControler/join/${gameCode}`);
        return response.data;
    },
    getGameData: async (gameId: string): Promise<Game> => {
        const response = await axios.get(`${API_URL}/GamesControler/${gameId}`);
        return response.data;
    },
    startGame: async (gameId: string) => {
        const response = await axios.post(`${API_URL}/GamesControler/start/${gameId}`)
        return response.data;
    }
}

export const websocketEvents = {
    ReciveNewPlayerJoined: "ReciveNewPlayerJoined",
    ReciveMarkCell: "ReciveMarkCell",
    ReciveStartGame: "ReciveStartGame",
    ReciveAddNote: "ReciveAddNote",
    ReciveRemoveNote: "ReciveRemoveNote",
    ReciveRemoveAllNotes: "ReciveRemoveAllNotes"
}

export const websocketEmits = {
    MarkCell: "MarkCell",
    AddNote: "AddNote",
    RemoveNote: "RemoveNote",
    RemoveAllNotes: "RemoveAllNotes"
}
