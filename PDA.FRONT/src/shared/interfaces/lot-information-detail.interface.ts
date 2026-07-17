import { ILotInformationChecked } from "./lot-information-checked.interface"; 

export interface ILotInformationMaterial { 
    PartNumber: string;
    Qty:        number; 
    QtyChecked: number; 
    Detail:     ILotInformationChecked[];
} 