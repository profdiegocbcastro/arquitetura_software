import { serializeChampionship } from "../presenters/serializers.js";

export class DemoController {
  constructor({ buildBrazilianChampionshipUseCase }) {
    this.buildBrazilianChampionshipUseCase = buildBrazilianChampionshipUseCase;
  }

  register(app) {
    app.post("/demo/brazilian-championship", (req, res) => {
      const championship = this.buildBrazilianChampionshipUseCase.execute();

      res.status(201).json(serializeChampionship(championship, { full: true }));
    });
  }
}
