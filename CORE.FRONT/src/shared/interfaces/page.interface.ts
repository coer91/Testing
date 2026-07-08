import { IOption, ITranslatory } from "hwmx-angular/interfaces";

/** ProjectPageDTO */
export interface IPage {
    Id:          number;
    Name:        string;
    Path:        string;
    Icon:        string;
    ProjectId:   number;
    Project:     string;
    ModuleId:    number | null;
    Module:      string | null;
    SubmoduleId: number | null;
    Submodule:   string | null;
    IsActive:    boolean;
    ActiveKey:   string;
    ShowIndex:   boolean;
    Sequence:    number;
    Translatory: ITranslatory;
    Roles:       IOption[]; 
}


export interface IMenuItem {
    Id:       string;
    Icon:     string;
    Item:     string;
    Type:     'Page' | 'Submodule';
    Path:     string;
    Sequence: number;
}