export interface IFileImage {
    value?: string | null;
    type?: 'no-user' | 'no-image';  
    size?: string;
    showDelete?: boolean;
    alertOnDelete?: boolean;
}