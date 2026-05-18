CREATE TABLE dbo.TblProjectsModules(
	Id            INT         NOT NULL IDENTITY,
	[Name]        VARCHAR(50) NOT NULL,
	Icon          VARCHAR(80) NULL,
	ProjectId     INT         NOT NULL,
	MenuTypeId    INT         NOT NULL DEFAULT(1),
	ShowIndicator BIT         NOT NULL DEFAULT(1),
	[Sequence]    INT         NOT NULL DEFAULT(0),
	CONSTRAINT PK_TblProjectsModules_Id PRIMARY KEY(Id),
	CONSTRAINT FK_TblProjectsModules_ProjectId FOREIGN KEY(ProjectId) REFERENCES dbo.TblProjects(Id),
	CONSTRAINT FK_TblProjectsModules_MenuTypeId FOREIGN KEY(MenuTypeId) REFERENCES dbo.TblProjectsMenuType(Id),
	CONSTRAINT UN_TblProjectsModules_Name_ProjectId UNIQUE([Name], ProjectId)
);