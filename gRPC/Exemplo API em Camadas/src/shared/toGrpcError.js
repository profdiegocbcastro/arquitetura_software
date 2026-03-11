import grpc from "@grpc/grpc-js";

export function toGrpcError(error) {
  if (error.code !== undefined) {
    return error;
  }

  return {
    code: grpc.status.INTERNAL,
    message: error.message || "Erro interno inesperado.",
  };
}
