import { IOption } from "hwmx-angular/interfaces";

/** UserDTO */
export interface IUser {
    Id:           number; 
    User:         string;
    FullName:     string;
    Email:        number;
    Factory:      string; 
    DepartmentId: string; 
    Department:   string; 
    PartnerId:    number; 
    Partner:      string;  
    IsActive:     boolean;
    Roles:        IOption[]; 
}


/** UserRoleDTO */
export interface IUserRole {
    Id:     number; 
    UserId: number;
    User:   string;
    RoleId: number;
    Role:   string; 
    IsMain: boolean; 
}