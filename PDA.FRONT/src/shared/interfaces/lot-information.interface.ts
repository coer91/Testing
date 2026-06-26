import { IDataSource } from "./data-source.interface";

/** LotInformationDTO */
export interface ILotInformation extends IDataSource {
    PartName:       string;
    PoNumber:       string;
    Unit:           string;
    StorageCode:    string;
    Storage:        string;
    Location:       string;
    CaseLabelId:    string;
    SplitNumber:    string;
    MergeNumber:    string;
    Remark:         string;
    vendorCode:     string;
    Vendor:         string;
    InputDate:      string;
    ProductionDate: string;
    HasDefect:      boolean;
    HasInspection:  boolean;
    HasEO:          boolean;
    IsDeleted:      boolean; 
}  