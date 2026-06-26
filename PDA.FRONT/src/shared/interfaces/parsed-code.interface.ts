export interface IParsedCode {
    /** sPlant */
    erpCode: string;  

    /** sVdCd */
    vendorCode: string;  
    
    /** sPartNo */
    partNumber: string;  
    
    /** sLotNo */
    lotNumber: string; 
    
    /** sQty */
    qty: string; 
    
    /** sUnit */
    unit: string; 
    
    /** sEBELN */
    deliverySlip: string;  
    
    /** sEBELP */
    deliveryItem: string; 
    
    /** sWHCD */
    warehouse: string; 
    
    /** sType */
    category: string; 
    
    /** sEONo */
    eoNumber: string; 
    
    /** sProdDate */
    prodDate: string;  
    
    /** sModel */
    model: string;  

    corp: string;       
            
    ship: string;    

    container: string;  
    
    message: string;
} 