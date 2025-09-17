interface Report {
  process(): void;
}

class PDFReport implements Report {
  process() {
    console.log("Processing PDF report...");
  }
}

class CSVReport implements Report {
  process() {
    console.log("Processing CSV report...");
  }
}

class ReportProcessor {
  process(report: Report) {
    report.process();
  }
}

const processor = new ReportProcessor();
processor.process(new PDFReport());
processor.process(new CSVReport());
