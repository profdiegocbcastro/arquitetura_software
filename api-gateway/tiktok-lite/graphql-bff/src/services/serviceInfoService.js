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
        "Gateway -> GraphQL BFF -> API 1 gRPC (video feed) + API 2 gRPC (playback) -> API 3 gRPC (adaptive delivery) + RTMP ingest",
    };
  }
}
