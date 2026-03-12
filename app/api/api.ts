import axios from "axios";

export type BoardCell = {
    CellValue: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    IsCorrect: boolean;
    CellNotes: (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[];
}

export type Game = {
    Id: string;
    PlayerIds: string[];
    BoardState: BoardCell[];
}
export type CreateGameResponse = {
    UserJwt: string;
    Game: Game;
}
export type JoinGameResponse = CreateGameResponse;

export const api = {
    createGame: async (): Promise<CreateGameResponse> => {
        const response = await axios.post("http://localhost:5254/GamesControler/create");
        return response.data;
    },
    joinGame: async (gameId: string): Promise<JoinGameResponse> => {
        const response = await axios.post(`http://localhost:5254/GamesControler/join/${gameId}`);
        return response.data;
    },
    getGameData: async (gameId: string, userJwt: string): Promise<Game> => {
        const response = await axios.get(`http://localhost:5254/GamesControler/${gameId}`);
        return response.data;
    }
}