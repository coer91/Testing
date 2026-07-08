import { ILotInformation } from "./lot-information.interface";

export interface IOrderTrolly {
    ProductionDate: string;
    PartNumber: string;
    Qty: number;
    QtyChecked: number;
    Detail: ILotInformation[];
}