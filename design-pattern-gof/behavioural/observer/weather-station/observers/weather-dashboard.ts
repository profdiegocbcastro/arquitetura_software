import { WeatherStation } from "../subjects/weather-station";
import { Observer } from "./observer";

export class WeatherDashboard implements Observer {
  update(subject: WeatherStation): void {
    console.log(
      `[WeatherDashboard] Painel atualizado com ${subject.getTemperature()}C e ${subject.getHumidity()}% de umidade.`,
    );
  }
}
