import { ILotInformation } from "./lot-information.interface";

export interface ITrollyOrder {
    ProductionDate: string;
    Sequence:       number;
    PartNumber:     string; 
    Qty:            number;
    MaxQty:         number;
    QtyChecked:     number;
    Detail:         ILotInformation[];
}