export interface IParsedCode {
    LotNumber:      string; 
    PartNumber:     string;  
    EoNumber:       string; 
    Qty:            string; 
    Unit:           string; 
    StorageCode:    string;  
    VendorCode:     string;  
    ProductionDate: string;    
    erpCode:        string; // sPlant 
    DeliverySlip:   string; // sEBELN 
    DeliveryItem:   string; // sEBELP
    Category:       string;  
    Model:          string;   
    corp:           string;       
    ship:           string;    
    container:      string;  
    Message:        string;
} 