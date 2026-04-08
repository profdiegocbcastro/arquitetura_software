import crypto from "node:crypto";

/**
 * Cria assinatura HMAC SHA-256 de um payload.
 */
export function createSignature(rawPayload, secret) {
  return crypto.createHmac("sha256", secret).update(rawPayload).digest("hex");
}

/**
 * Valida assinatura recebida usando comparação segura contra timing attacks.
 */
export function isSignatureValid(rawPayload, secret, receivedSignature) {
  if (!receivedSignature) {
    return false;
  }

  const expectedSignature = createSignature(rawPayload, secret);
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const receivedBuffer = Buffer.from(receivedSignature, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}
