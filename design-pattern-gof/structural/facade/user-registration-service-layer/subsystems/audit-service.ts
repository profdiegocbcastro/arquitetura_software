export class AuditService {
  register(event: string): void {
    console.log(`[Audit] Evento registrado: ${event}`);
  }
}
