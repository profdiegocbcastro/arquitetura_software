import { serializeMatch, serializeScore } from "../presenters/serializers.js";

export class ResultController {
  constructor({ findResult, registerResult, updateResult, deleteResult }) {
    this.findResult = findResult;
    this.registerResult = registerResult;
    this.updateResult = updateResult;
    this.deleteResult = deleteResult;
  }

  register(app) {
    app.get("/championships/:championshipId/matches/:matchId/result", (req, res) => {
      const score = this.findResult.execute(req.params.championshipId, req.params.matchId);

      res.json(serializeScore(score));
    });

    app.post("/championships/:championshipId/matches/:matchId/result", (req, res) => {
      const match = this.registerResult.execute(
        req.params.championshipId,
        req.params.matchId,
        req.body
      );

      res.status(201).json(serializeMatch(match));
    });

    app.put("/championships/:championshipId/matches/:matchId/result", (req, res) => {
      const match = this.updateResult.execute(
        req.params.championshipId,
        req.params.matchId,
        req.body
      );

      res.json(serializeMatch(match));
    });

    app.delete("/championships/:championshipId/matches/:matchId/result", (req, res) => {
      this.deleteResult.execute(req.params.championshipId, req.params.matchId);

      res.status(204).send();
    });
  }
}
