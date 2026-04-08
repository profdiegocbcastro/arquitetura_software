/**
 * =========================================================
 * Serviço de informações do BFF
 * =========================================================
 */
export class ServiceInfoService {
  constructor(instanceName) {
    this.instanceName = instanceName;
  }

  getServiceInfo() {
    return {
      instanceName: this.instanceName,
      architecture:
        "Gateway -> GraphQL BFF -> API 1 gRPC (chat) -> API 2 gRPC (notification)",
    };
  }
}
