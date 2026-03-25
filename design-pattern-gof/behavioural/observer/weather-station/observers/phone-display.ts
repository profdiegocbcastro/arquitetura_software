import { WeatherStation } from "../subjects/weather-station";
import { Observer } from "./observer";

export class PhoneDisplay implements Observer {
  update(subject: WeatherStation): void {
    console.log(
      `[PhoneDisplay] Temperatura ${subject.getTemperature()}C e umidade ${subject.getHumidity()}%.`,
    );
  }
}
