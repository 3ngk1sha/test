"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveFiles = exports.moveFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
async function moveFile(sourcePath, destinationPath, overwrite = true) {
    try {
        if (overwrite) {
            await fs_1.default.promises.unlink(destinationPath);
        }
        else {
            await fs_1.default.promises.access(destinationPath);
            throw new Error(`File already exists at destination: ${destinationPath}`);
        }
    }
    catch {
    }
    await fs_1.default.promises.copyFile(sourcePath, destinationPath);
    await fs_1.default.promises.unlink(sourcePath);
    return destinationPath;
}
exports.moveFile = moveFile;
async function moveFiles(sourceFolder, destinationFolder, overwrite = true) {
    const files = await fs_1.default.promises.readdir(sourceFolder);
    const filePaths = [];
    for (const file of files) {
        const filePath = (0, path_1.join)(sourceFolder, file);
        const stat = await fs_1.default.promises.stat(filePath);
        if (stat.isFile()) {
            filePaths.push(filePath);
        }
    }
    for (const filePath of filePaths) {
        const fileName = (0, path_1.basename)(filePath);
        const destination = (0, path_1.resolve)((0, path_1.join)(destinationFolder, fileName));
        await moveFile(filePath, destination, overwrite);
    }
}
exports.moveFiles = moveFiles;
//# sourceMappingURL=fs.js.map