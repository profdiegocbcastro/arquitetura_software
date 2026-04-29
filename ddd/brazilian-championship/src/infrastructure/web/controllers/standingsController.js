import { serializeStandingRow } from "../presenters/serializers.js";

export class StandingsController {
  constructor({ findStandings, findRelegation }) {
    this.findStandings = findStandings;
    this.findRelegation = findRelegation;
  }

  register(app) {
    app.get("/championships/:championshipId/standings", (req, res) => {
      const standings = this.findStandings.execute(req.params.championshipId);

      res.json(standings.map(serializeStandingRow));
    });

    app.get("/championships/:championshipId/relegation", (req, res) => {
      const relegation = this.findRelegation.execute(req.params.championshipId);

      res.json({
        relegationZone: relegation.relegationZone.map(serializeStandingRow),
        nextSeasonSerieB: relegation.nextSeasonSerieB,
      });
    });
  }
}
