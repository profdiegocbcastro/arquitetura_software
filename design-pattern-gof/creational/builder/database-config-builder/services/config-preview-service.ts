import { DatabaseConfig } from "../products/database-config";

export class ConfigPreviewService {
  print(config: DatabaseConfig): void {
    console.log("Configuração de banco montada:");
    console.log(JSON.stringify(config, null, 2));
  }
}
