import { HelperService } from './helper.service';
import { HelperType } from './types';
export declare class HelperController {
    private readonly helperService;
    constructor(helperService: HelperService);
    getHelpers(type: HelperType): {
        name: import("../utils/types/extension").ExtensionName;
    }[];
}
