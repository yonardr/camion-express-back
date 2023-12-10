export declare class FileService {
    addFile(file: any, keep_name: boolean, folder: string): Promise<string>;
    deleteFile(name: any, folder: any): Promise<{
        message: string;
    }>;
}
