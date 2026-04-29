import { serializeTeam } from "../presenters/serializers.js";

export class TeamController {
  constructor({ listTeams, createTeam, findTeam, updateTeam, deleteTeam }) {
    this.listTeams = listTeams;
    this.createTeam = createTeam;
    this.findTeam = findTeam;
    this.updateTeam = updateTeam;
    this.deleteTeam = deleteTeam;
  }

  register(app) {
    app.get("/championships/:championshipId/teams", (req, res) => {
      const teams = this.listTeams.execute(req.params.championshipId);

      res.json(teams.map(serializeTeam));
    });

    app.post("/championships/:championshipId/teams", (req, res) => {
      const team = this.createTeam.execute(req.params.championshipId, req.body);

      res.status(201).json(serializeTeam(team));
    });

    app.get("/championships/:championshipId/teams/:teamId", (req, res) => {
      const team = this.findTeam.execute(req.params.championshipId, req.params.teamId);

      res.json(serializeTeam(team));
    });

    app.put("/championships/:championshipId/teams/:teamId", (req, res) => {
      const team = this.updateTeam.execute(req.params.championshipId, req.params.teamId, req.body);

      res.json(serializeTeam(team));
    });

    app.delete("/championships/:championshipId/teams/:teamId", (req, res) => {
      this.deleteTeam.execute(req.params.championshipId, req.params.teamId);

      res.status(204).send();
    });
  }
}
