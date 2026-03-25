import { PhoneDisplay } from "./observers/phone-display";
import { WeatherDashboard } from "./observers/weather-dashboard";
import { WeatherStation } from "./subjects/weather-station";

const station = new WeatherStation();

station.subscribe(new PhoneDisplay());
station.subscribe(new WeatherDashboard());

station.setMeasurements(26, 72);
