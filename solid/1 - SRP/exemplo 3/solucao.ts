class FileCompressor {
  compress(file: Buffer): Buffer {
    console.log("Comprimindo arquivo...");
    return file.slice(0, file.length / 2);
  }
}

class CloudUploader {
  upload(file: Buffer, destination: string) {
    console.log(`Enviando arquivo para ${destination}`);
  }
}

class FileUploadService {
  constructor(
    private compressor: FileCompressor,
    private uploader: CloudUploader
  ) {}

  uploadFile(file: Buffer, destination: string) {
    const compressedFile = this.compressor.compress(file);
    this.uploader.upload(compressedFile, destination);
  }
}

const fileCompressor = new FileCompressor();
const cloudUploader = new CloudUploader();

const fileUploadService = new FileUploadService(fileCompressor, cloudUploader);

const myFile = Buffer.from("Este é o conteúdo do meu arquivo para upload.");

fileUploadService.uploadFile(myFile, "/uploads/meu-documento.zip");