import { WeatherStation } from "../subjects/weather-station";

export interface Observer {
  update(subject: WeatherStation): void;
}
