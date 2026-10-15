import { LOT_INFORMATION_DTO } from "./lot-information.interface";

export interface LOT_INFORMATION_CHECKED_DTO extends LOT_INFORMATION_DTO { 
    QTY_CHECKED: number;
}  