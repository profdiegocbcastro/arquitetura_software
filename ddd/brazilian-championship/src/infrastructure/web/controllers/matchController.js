import { serializeMatch } from "../presenters/serializers.js";

export class MatchController {
  constructor({ listMatches, createMatch, findMatch, updateMatch, deleteMatch }) {
    this.listMatches = listMatches;
    this.createMatch = createMatch;
    this.findMatch = findMatch;
    this.updateMatch = updateMatch;
    this.deleteMatch = deleteMatch;
  }

  register(app) {
    app.get("/championships/:championshipId/matches", (req, res) => {
      const matches = this.listMatches.execute(req.params.championshipId);

      res.json(matches.map(serializeMatch));
    });

    app.post("/championships/:championshipId/rounds/:number/matches", (req, res) => {
      const match = this.createMatch.execute(
        req.params.championshipId,
        req.params.number,
        req.body
      );

      res.status(201).json(serializeMatch(match));
    });

    app.get("/championships/:championshipId/matches/:matchId", (req, res) => {
      const match = this.findMatch.execute(req.params.championshipId, req.params.matchId);

      res.json(serializeMatch(match));
    });

    app.put("/championships/:championshipId/matches/:matchId", (req, res) => {
      const match = this.updateMatch.execute(
        req.params.championshipId,
        req.params.matchId,
        req.body
      );

      res.json(serializeMatch(match));
    });

    app.delete("/championships/:championshipId/matches/:matchId", (req, res) => {
      this.deleteMatch.execute(req.params.championshipId, req.params.matchId);

      res.status(204).send();
    });
  }
}
