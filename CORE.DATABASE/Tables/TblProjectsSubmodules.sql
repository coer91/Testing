CREATE TABLE dbo.TblProjectsSubmodules(
	Id            INT         NOT NULL IDENTITY,
	[Name]        VARCHAR(50) NOT NULL,
	Icon          VARCHAR(80) NULL,
	ModuleId      INT         NOT NULL,
	MenuTypeId    INT         NOT NULL DEFAULT(1),
	ShowIndicator BIT         NOT NULL DEFAULT(1),
	[Sequence]    INT         NOT NULL DEFAULT(0),
	CONSTRAINT PK_TblProjectsSubmodules_Id PRIMARY KEY(Id),
	CONSTRAINT FK_TblProjectsSubmodules_ModuleId FOREIGN KEY(ModuleId) REFERENCES dbo.TblProjectsModules(Id),
	CONSTRAINT FK_TblProjectsSubmodules_MenuTypeId FOREIGN KEY(MenuTypeId) REFERENCES dbo.TblProjectsMenuType(Id),
	CONSTRAINT UN_TblProjectsSubmodules_ModuleId_Name UNIQUE(ModuleId, [Name])
);