import { Observer } from "../observers/observer";

export class WeatherStation {
  private readonly observers: Observer[] = [];
  private temperature = 0;
  private humidity = 0;

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  setMeasurements(temperature: number, humidity: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.notify();
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update(this));
  }

  getTemperature(): number {
    return this.temperature;
  }

  getHumidity(): number {
    return this.humidity;
  }
}
