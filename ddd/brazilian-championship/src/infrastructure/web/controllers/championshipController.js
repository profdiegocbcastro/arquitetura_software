import { serializeChampionship } from "../presenters/serializers.js";

export class ChampionshipController {
  constructor({ listChampionships, createChampionship, findChampionship, updateChampionship, deleteChampionship }) {
    this.listChampionships = listChampionships;
    this.createChampionship = createChampionship;
    this.findChampionship = findChampionship;
    this.updateChampionship = updateChampionship;
    this.deleteChampionship = deleteChampionship;
  }

  register(app) {
    app.get("/championships", (req, res) => {
      const championships = this.listChampionships.execute();

      res.json(championships.map((championship) => serializeChampionship(championship)));
    });

    app.post("/championships", (req, res) => {
      const championship = this.createChampionship.execute(req.body);

      res.status(201).json(serializeChampionship(championship, { full: true }));
    });

    app.get("/championships/:championshipId", (req, res) => {
      const championship = this.findChampionship.execute(req.params.championshipId);

      res.json(serializeChampionship(championship, { full: true }));
    });

    app.put("/championships/:championshipId", (req, res) => {
      const championship = this.updateChampionship.execute(req.params.championshipId, req.body);

      res.json(serializeChampionship(championship, { full: true }));
    });

    app.delete("/championships/:championshipId", (req, res) => {
      this.deleteChampionship.execute(req.params.championshipId);

      res.status(204).send();
    });
  }
}
