import { DocumentsService } from "./documents.service";
import { AddDocumentDto } from "./dto/add-document.dto";
export declare class DocumentsController {
    private documentService;
    constructor(documentService: DocumentsService);
    getTypes(): Promise<import("./types-documents.model").TypesDocuments[]>;
    createType(name: string): Promise<import("./types-documents.model").TypesDocuments>;
    deleteType(id: number): Promise<number>;
    addDocument(dto: AddDocumentDto, file: any): Promise<import("./documents.model").Documents>;
    getAllDocuments(): Promise<import("./documents.model").Documents[]>;
    deleteDocument(id: number): Promise<{
        message: string;
    }>;
}
