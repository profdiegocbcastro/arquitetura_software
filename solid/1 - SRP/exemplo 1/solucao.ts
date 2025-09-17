namespace Solucao {
  // 1ª responsabilidade: gerenciar alunos
  export class StudentRepository {
    private students: { name: string; grades: number[] }[] = [];

    addStudent(name: string, grades: number[]) {
      this.students.push({ name, grades });
    }

    getStudents() {
      return this.students;
    }
  }

  // 2ª responsabilidade: calcular média
  export class AverageCalculator {
    calculateAverage(student: { name: string; grades: number[] }): number {
      const sum = student.grades.reduce((a, b) => a + b, 0);
      return sum / student.grades.length;
    }
  }

  // 3ª responsabilidade: gerar relatório
  export class ReportGenerator {
    constructor(private calculator: AverageCalculator) {}

    generateReport(students: { name: string; grades: number[] }[]): string {
      const report = students.map(s => ({
        name: s.name,
        average: this.calculator.calculateAverage(s)
      }));
      return JSON.stringify(report, null, 2);
    }
  }

  // 4ª responsabilidade: enviar relatório
  export class EmailService {
    sendReport(email: string, report: string) {
      console.log(`Enviando relatório para ${email}...\n${report}`);
    }
  }

  // Classe que orquestra todas as responsabilidades
  export class StudentService {
    constructor(
      private repository: StudentRepository,
      private reportGenerator: ReportGenerator,
      private emailService: EmailService
    ) {}

    processStudents(email: string) {
      const students = this.repository.getStudents();
      const report = this.reportGenerator.generateReport(students);
      this.emailService.sendReport(email, report);
    }
  }
}

// --- Uso ---
const repo = new Solucao.StudentRepository();
repo.addStudent("Alice", [8, 9, 7]);
repo.addStudent("Bob", [6, 5, 7]);

const calculator = new Solucao.AverageCalculator();
const reportGenerator = new Solucao.ReportGenerator(calculator);
const emailService = new Solucao.EmailService();

const service = new Solucao.StudentService(repo, reportGenerator, emailService);

console.log("Média de Alice:", calculator.calculateAverage(repo.getStudents()[0]!));
service.processStudents("professor@escola.com");
