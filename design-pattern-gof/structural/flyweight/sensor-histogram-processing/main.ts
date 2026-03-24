import { SensorValueBucketFactory } from "./factories/sensor-value-bucket-factory";
import { SensorHistogramService } from "./services/sensor-histogram-service";

const bucketFactory = new SensorValueBucketFactory();
const histogramService = new SensorHistogramService(bucketFactory);

const readings = [
  21.31, 21.34, 21.29, 21.28, 21.35, 21.82, 21.79, 21.81, 22.04, 22.01, 22.02,
];

readings.forEach((value) => histogramService.ingest(value));

histogramService.printHistogram();
console.log("Resumo processado:", histogramService.summarize());
