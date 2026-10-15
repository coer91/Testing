export interface IFileboxPanelType { 
    multiple?: number; 
    required?: number; 
    downloadFiles?: boolean;
    alertOnDelete?: boolean;
    acceptsImages?: boolean;
    acceptsExcel?: boolean;
    acceptsWord?: boolean;
    acceptsPowerPoint?: boolean;
    acceptsPDF?: boolean;
    showAddButton?: boolean;
    showSaveButton?: boolean;
    showDeleteButton?: boolean;
    height?: string;
    maxHeight?: string;
}