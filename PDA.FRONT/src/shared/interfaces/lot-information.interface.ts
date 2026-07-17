/** LotInformationDTO */
export interface ILotInformation {
    LotNumber:      string; 
    PartNumber:     string;
    PartName:       string;
    EoNumber:       string;
    Qty:            number; 
    Unit:           string;
    StorageCode:    string;
    Storage:        string;
    Location:       string;
    CaseLabelId:    string;
    VendorCode:     string;
    Vendor:         string;
    InputDate:      string;
    ProductionDate: string;
    HasDefect:      boolean;
    HasInspection:  boolean;
    HasEO:          boolean;
    IsDeleted:      boolean;  
}  