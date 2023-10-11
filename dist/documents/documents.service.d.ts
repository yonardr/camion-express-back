import { Documents } from "./documents.model";
import { TypesDocuments } from "./types-documents.model";
import { FileService } from "./file.servise";
import { AddDocumentDto } from "./dto/add-document.dto";
export declare class DocumentsService {
    private documentsRepository;
    private typesDocumentsRepository;
    private fileService;
    constructor(documentsRepository: typeof Documents, typesDocumentsRepository: typeof TypesDocuments, fileService: FileService);
    createType(name: string): Promise<TypesDocuments>;
    deleteType(id: number): Promise<number>;
    getTypes(): Promise<TypesDocuments[]>;
    addDocuments(dto: AddDocumentDto, file: any): Promise<Documents>;
    getAllDocuments(): Promise<Documents[]>;
    deleteDocument(id: number): Promise<{
        message: string;
    }>;
}
