export abstract class ReportExporter {
  export(fileName: string, rows: string[]): void {
    console.log(`[ReportExporter] Preparando exportacao de ${fileName}.`);
    const content = this.format(rows);
    this.save(fileName, content);
  }

  protected abstract format(rows: string[]): string;

  protected save(fileName: string, content: string): void {
    console.log(`[ReportExporter] Salvando ${fileName}: ${content}`);
  }
}
