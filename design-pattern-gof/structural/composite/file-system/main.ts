import { FileEntry } from "./components/file-entry";
import { FolderEntry } from "./composites/folder-entry";
import { FileSystemService } from "./services/file-system-service";

const rootFolder = new FolderEntry("projeto");
const srcFolder = new FolderEntry("src");
const assetsFolder = new FolderEntry("assets");

srcFolder.add(new FileEntry("index.ts", 12));
srcFolder.add(new FileEntry("user-service.ts", 18));

assetsFolder.add(new FileEntry("logo.png", 140));
assetsFolder.add(new FileEntry("banner.jpg", 320));

rootFolder.add(srcFolder);
rootFolder.add(assetsFolder);
rootFolder.add(new FileEntry("README.md", 8));

const fileSystemService = new FileSystemService();
fileSystemService.print(rootFolder);
