import { serializeRound } from "../presenters/serializers.js";

export class RoundController {
  constructor({ listRounds, createRound, findRound, updateRound, deleteRound }) {
    this.listRounds = listRounds;
    this.createRound = createRound;
    this.findRound = findRound;
    this.updateRound = updateRound;
    this.deleteRound = deleteRound;
  }

  register(app) {
    app.get("/championships/:championshipId/rounds", (req, res) => {
      const rounds = this.listRounds.execute(req.params.championshipId);

      res.json(rounds.map(serializeRound));
    });

    app.post("/championships/:championshipId/rounds", (req, res) => {
      const round = this.createRound.execute(req.params.championshipId, req.body);

      res.status(201).json(serializeRound(round));
    });

    app.get("/championships/:championshipId/rounds/:number", (req, res) => {
      const round = this.findRound.execute(req.params.championshipId, req.params.number);

      res.json(serializeRound(round));
    });

    app.put("/championships/:championshipId/rounds/:number", (req, res) => {
      const round = this.updateRound.execute(req.params.championshipId, req.params.number, req.body);

      res.json(serializeRound(round));
    });

    app.delete("/championships/:championshipId/rounds/:number", (req, res) => {
      this.deleteRound.execute(req.params.championshipId, req.params.number);

      res.status(204).send();
    });
  }
}
