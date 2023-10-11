import { TrucksService } from "./trucks.service";
export declare class TrucksController {
    private trucksService;
    constructor(trucksService: TrucksService);
    get(): Promise<any[]>;
}
