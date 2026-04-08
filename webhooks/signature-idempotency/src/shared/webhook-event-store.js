/**
 * Store em memória para controle de idempotência.
 *
 * Em produção, essa informação normalmente ficaria em banco ou cache
 * compartilhado entre instâncias do serviço.
 */
export class WebhookEventStore {
  constructor() {
    this.processedEvents = new Set();
  }

  has(eventId) {
    return this.processedEvents.has(eventId);
  }

  save(eventId) {
    this.processedEvents.add(eventId);
  }

  list() {
    return Array.from(this.processedEvents.values());
  }
}
