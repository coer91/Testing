import { IFileInfo } from "../file-info.interface";

export interface IFileboxFileInfo extends IFileInfo {    
    Icon: string;
    File: File;
}