import { IPage } from "./page.interface";

/** ProjectSubmoduleDTO */
export interface ISubmodule {
    Id:            number;
    Name:          string;
    Icon:          string;
    ProjectId:     number;
    Project:       string;
    ModuleId:      number;
    Module:        string;
    MenuTypeId:    number;
    MenuType:      string;
    ShowIndicator: boolean;    
    Sequence:      number;
    Pages:         IPage[]; 
}