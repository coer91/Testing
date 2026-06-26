import { ILotInformation } from "@appShared/interfaces";

/** */
export interface IIssueRequest { 
    PartNumber:  string;
    Qty:         number;
    StorageCode: string;
    InputDate:   string;
    QtyChecked:  number;  
    Detail:      ILotInformation[];
}


/** */
export interface IMaterialFIFO { 
    LotNumber:  string; 
    PartNumber: string; 
    Location:   string;
    InputDate:  string; 
}


/** */
export interface ILotFIFO { 
    LotNumber:   string; 
    PartNumber:  string; 
    Location:    string;
    InputDate:   string; 
    StorageCode: string;
    Qty:         number;
}