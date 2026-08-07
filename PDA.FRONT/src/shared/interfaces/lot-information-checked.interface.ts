import { LOT_INFORMATION_DTO } from "./lot-information.interface";

export interface ILotInformationChecked extends LOT_INFORMATION_DTO { 
    QTY_CHECKED: number;
}  