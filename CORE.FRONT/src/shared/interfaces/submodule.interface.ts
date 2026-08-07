import { ITranslatory } from "hwmx-angular/interfaces";
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
    ShowIndex:     boolean;  
    Sequence:      number;
    Translatory:   ITranslatory;
    Pages:         IPage[]; 
}