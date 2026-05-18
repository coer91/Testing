CREATE TABLE dbo.TblRolesPages(
	Id        INT NOT NULL IDENTITY,
	RoleId    INT NOT NULL,
	PageId    INT NOT NULL,
	CanCreate BIT NOT NULL DEFAULT(0),
	CanUpdate BIT NOT NULL DEFAULT(0),
	CanDelete BIT NOT NULL DEFAULT(0),
	CONSTRAINT PK_TblRolesPages_Id PRIMARY KEY(Id),
	CONSTRAINT FK_TblRolesPages_RoleId FOREIGN KEY(RoleId) REFERENCES dbo.TblRoles(Id),
	CONSTRAINT FK_TblRolesPages_PageId FOREIGN KEY(PageId) REFERENCES dbo.TblProjectsPages(Id),
	CONSTRAINT UN_TblRolesPages_RoleId_PageId UNIQUE(RoleId, PageId)
);