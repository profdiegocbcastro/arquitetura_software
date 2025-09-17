class StudentManager {
  private students: { name: string; grades: number[] }[] = [];

  // 1ª responsabilidade: gerenciar alunos
  addStudent(name: string, grades: number[]) {
    this.students.push({ name, grades });
  }

  // 2ª responsabilidade: calcular média
  calculateAverage(name: string): number | null {
    const student = this.students.find(s => s.name === name);
    if (!student) return null;
    const sum = student.grades.reduce((a, b) => a + b, 0);
    return sum / student.grades.length;
  }

  // 3ª responsabilidade: exportar relatório
  generateReport(): string {
    const report = this.students.map(s => ({
      name: s.name,
      average: this.calculateAverage(s.name)
    }));
    return JSON.stringify(report, null, 2);
  }

  // 4ª responsabilidade: enviar relatório
  sendReportByEmail(email: string) {
    const report = this.generateReport();
    console.log(`Enviando relatório para ${email}...\n${report}`);
  }
}

const manager = new StudentManager();
manager.addStudent("Alice", [8, 9, 7]);
manager.addStudent("Bob", [6, 5, 7]);

console.log(manager.calculateAverage("Alice"));
manager.sendReportByEmail("professor@escola.com");
