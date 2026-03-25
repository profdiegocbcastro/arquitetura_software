export class SmartLamp {
  private isOn = false;

  constructor(private readonly name: string) {}

  turnOn(): void {
    this.isOn = true;
    console.log(`[SmartLamp] ${this.name} ligada.`);
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`[SmartLamp] ${this.name} desligada.`);
  }

  getStatus(): boolean {
    return this.isOn;
  }
}
