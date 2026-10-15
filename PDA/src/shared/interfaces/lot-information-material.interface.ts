import { LOT_INFORMATION_DTO } from "./lot-information.interface";

export interface LOT_INFORMATION_MATERIAL_DTO { 
    PART_NUMBER: string;
    QTY:         number; 
    QTY_CHECKED: number; 
    DETAIL:      LOT_INFORMATION_DTO[];
} 