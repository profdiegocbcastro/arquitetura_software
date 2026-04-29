import { serializePlayer } from "../presenters/serializers.js";

export class PlayerController {
  constructor({ listPlayers, createPlayer, findPlayer, updatePlayer, deletePlayer }) {
    this.listPlayers = listPlayers;
    this.createPlayer = createPlayer;
    this.findPlayer = findPlayer;
    this.updatePlayer = updatePlayer;
    this.deletePlayer = deletePlayer;
  }

  register(app) {
    app.get("/championships/:championshipId/teams/:teamId/players", (req, res) => {
      const players = this.listPlayers.execute(req.params.championshipId, req.params.teamId);

      res.json(players.map(serializePlayer));
    });

    app.post("/championships/:championshipId/teams/:teamId/players", (req, res) => {
      const player = this.createPlayer.execute(req.params.championshipId, req.params.teamId, req.body);

      res.status(201).json(serializePlayer(player));
    });

    app.get("/championships/:championshipId/teams/:teamId/players/:playerId", (req, res) => {
      const player = this.findPlayer.execute(
        req.params.championshipId,
        req.params.teamId,
        req.params.playerId
      );

      res.json(serializePlayer(player));
    });

    app.put("/championships/:championshipId/teams/:teamId/players/:playerId", (req, res) => {
      const player = this.updatePlayer.execute(
        req.params.championshipId,
        req.params.teamId,
        req.params.playerId,
        req.body
      );

      res.json(serializePlayer(player));
    });

    app.delete("/championships/:championshipId/teams/:teamId/players/:playerId", (req, res) => {
      this.deletePlayer.execute(req.params.championshipId, req.params.teamId, req.params.playerId);

      res.status(204).send();
    });
  }
}
