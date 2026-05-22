import { IPage } from "./page.interface";
import { ISubmodule } from "./submodule.interface";

/** ProjectModuleDTO */
export interface IModule {
    Id:            number;
    Name:          string;
    Icon:          string;
    ProjectId:     number;
    Project:       string;
    MenuTypeId:    number;
    MenuType:      string;
    ShowIndicator: boolean;
    Sequence:      number;
    Pages:         IPage[];
    Submodules:    ISubmodule[]; 
} 