import { BackupService } from "./contexts/backup-service";
import { GzipCompressionStrategy } from "./strategies/gzip-compression-strategy";
import { ZipCompressionStrategy } from "./strategies/zip-compression-strategy";

const backupService = new BackupService(new ZipCompressionStrategy());

backupService.backup("relatorio-financeiro.pdf");
backupService.setStrategy(new GzipCompressionStrategy());
backupService.backup("relatorio-financeiro.pdf");
