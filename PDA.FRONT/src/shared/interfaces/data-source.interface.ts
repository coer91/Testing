/** Use this interface for DATA GRID */
export interface IDataSource {
    LotNumber:  string; 
    PartNumber: string;
    EoNumber:   string;
    Qty:        number; 
}   

/** Use this interface for DATA GRID */
export interface IDataSourceScaned extends IDataSource {  
    Scaned: boolean; 
}  

export interface IDataSourceQty extends IDataSource { 
    QtyChecked: number; 
    Detail:     IDataSource[];
}  

export interface IDataSourceStatus extends IDataSource { 
    Status: number; 
}  

export interface IDataSourceLocation extends IDataSource { 
    Location: string;
    Status: number; 
}  