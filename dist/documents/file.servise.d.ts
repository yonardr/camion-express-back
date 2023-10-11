export declare class FileService {
    addFile(file: any, keep_name: any): Promise<string>;
    deleteFile(name: any): Promise<{
        message: string;
    }>;
}
