import { ILotInformationChecked } from "./lot-information-checked.interface"; 

export interface ILotInformationMaterial { 
    PART_NUMBER: string;
    QTY:        number; 
    QTY_CHECKED: number; 
    DETAIL:     ILotInformationChecked[];
} 