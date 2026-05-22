import { IOption } from "hwmx-angular/interfaces";

/** UserDTO */
export interface IUser {
    Id:       number; 
    User:     string;
    Fullname: string;
    Email:    number;
    Partner:  IOption;
    Role:     IOption;
    Roles:    IOption[]; 
}