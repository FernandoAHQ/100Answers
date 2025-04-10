import { Team } from "../types/teams";

export const deserializeTeams = (teams: object): Map<string, Team> => {
  const teamsMap = new Map<string, Team>();

  Object.entries(teams).forEach(([key, team]: [string, Team]) => {
    teamsMap.set(key, {
      players: new Set(team.players),
      points: team.points,
    });
  });

  return teamsMap;
};
