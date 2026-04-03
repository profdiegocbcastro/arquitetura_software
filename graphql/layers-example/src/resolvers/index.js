/**
 * Arquivo responsável por combinar todos os resolvers.
 *
 * Cada domínio possui seu próprio resolver,
 * e aqui fazemos a junção deles em um único objeto.
 */

import { createBookResolver } from "./bookResolver.js";
import { createAuthorResolver } from "./authorResolver.js";

/**
 * Função utilitária que mescla múltiplos objetos
 * de resolvers em um único objeto final.
 */
function mergeResolvers(...resolverObjects) {
  const merged = {};

  for (const resolvers of resolverObjects) {
    for (const [typeName, fields] of Object.entries(resolvers)) {
      merged[typeName] ??= {};
      Object.assign(merged[typeName], fields);
    }
  }

  return merged;
}

/**
 * Constrói o objeto final de resolvers.
 */
export function buildResolvers(deps) {
  return mergeResolvers(createBookResolver(deps), createAuthorResolver(deps));
}