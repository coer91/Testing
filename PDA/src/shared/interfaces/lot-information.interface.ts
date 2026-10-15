/** LotInformationDTO */
export interface LOT_INFORMATION_DTO {
    LOT_NUMBER:      string; 
    PART_NUMBER:     string;
    PART_NAME:       string;
    EO_NUMBER:       string;
    QTY:             number; 
    UNIT:            string;
    STORAGE_CODE:    string;
    STORAGE:         string;
    LOCATION:        string;
    CASE_LABEL_ID:   string;
    VENDOR_CODE:     string;
    VENDOR:          string;
    INPUT_DATE:      string;
    PRODUCTION_DATE: string;
    HAS_DEFECT:      string;
    HAS_INSPECTION:  string;
    HAS_EO:          string;
    IS_DELETED:      string;  
}  