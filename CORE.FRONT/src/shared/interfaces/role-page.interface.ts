/** RolePageDTO */
export interface IRolePage {
    Id:          number;
    RoleId:      number;
    Role:        string;
    PageId:      number;
    Page:        string;
    ProjectId:   number;
    Project:     string;
    ModuleId:    number | null;
    Module:      string | null;
    SubmoduleId: number | null;
    Submodule:   string | null;
    Path:        string;
    CanCreate:   boolean;
    CanUpdate:   boolean;
    CanDelete:   boolean;
}