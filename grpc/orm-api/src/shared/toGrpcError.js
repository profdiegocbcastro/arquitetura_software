import grpc from "@grpc/grpc-js";

export function toGrpcError(error) {
  if (error.name === "ValidationError") {
    return {
      code: grpc.status.INVALID_ARGUMENT,
      message: error.message,
    };
  }

  if (error.name === "NotFoundError") {
    return {
      code: grpc.status.NOT_FOUND,
      message: error.message,
    };
  }

  return {
    code: grpc.status.INTERNAL,
    message: error.message || "Erro interno inesperado.",
  };
}
