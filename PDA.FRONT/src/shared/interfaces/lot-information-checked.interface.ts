import { ILotInformation } from "./lot-information.interface";

export interface ILotInformationChecked extends ILotInformation { 
    QtyChecked: number;
}  