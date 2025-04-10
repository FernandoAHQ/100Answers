import { Team } from "./teams";

export enum PlayStage {
  LOADING = "LOADING",
  CODE = "CODE",
  NAME = "NAME",
  WAITING = "WAITING",
  IN_GAME = "IN-GAME",
  WAITING_FOR_PLAYERS = "WAITING_FOR_PLAYERS",
}

export enum GameStatus {
  WAITING_FOR_PLAYERS = "WAITING_FOR_PLAYERS",
  PLAYING = "PLAYING",
  GAME_OVER = "GAME_OVER",
}

export enum RoundMoment {
  FACE_OFF = "FACE_OFF",
  MAIN = "MAIN",
  STEAL = "STEAL",
  END = "END",
}

export type GameState = {
  id: string;
  state: GameStatus;
  teamSize: number;
  totalRounds: number;
  teams: Map<string, Team>;
  currentRound: number;
  roundMoment: RoundMoment;
  currentTeam: string;
};
