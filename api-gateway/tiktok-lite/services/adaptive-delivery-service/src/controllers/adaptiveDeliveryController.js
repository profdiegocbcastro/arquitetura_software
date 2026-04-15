import { ValidationError } from "../shared/applicationError.js";
import { toGrpcError } from "../shared/toGrpcError.js";

/**
 * =========================================================
 * Controller gRPC de Adaptive Delivery
 * =========================================================
 *
 * Camada de entrada do serviço gRPC.
 */
export function getAdaptiveDeliveryController(adaptiveDeliveryService) {
  return {
    /**
     * Implementação de:
     * rpc ResolveQuality(ResolveQualityRequest)
     * returns (ResolveQualityResponse)
     */
    async ResolveQuality(call, callback) {
      try {
        const networkProfile = readOptionalNetworkProfile(call.request.network_profile);
        const bandwidthKbps = readOptionalBandwidth(call.request.bandwidth_kbps);

        const response = adaptiveDeliveryService.resolveQuality({
          networkProfile,
          bandwidthKbps,
        });

        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },
  };
}

function readOptionalNetworkProfile(value) {
  const normalizedValue = (value ?? "auto").trim().toLowerCase();
  const supportedProfiles = ["low", "medium", "high", "auto"];

  if (!supportedProfiles.includes(normalizedValue)) {
    throw new ValidationError("network_profile deve ser low, medium, high ou auto.");
  }

  return normalizedValue;
}

function readOptionalBandwidth(value) {
  if (value === null || value === undefined || value === 0) {
    return 0;
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new ValidationError("bandwidth_kbps deve ser um número positivo.");
  }

  return Math.trunc(numericValue);
}
