CREATE TABLE dbo.TblProjectsPages(
	Id          INT          NOT NULL IDENTITY,
	[Name]      VARCHAR(50)  NOT NULL,
	[Path]      VARCHAR(250) NOT NULL, 
	Icon        VARCHAR(80)  NULL,
	ProjectId   INT          NOT NULL,
	ModuleId    INT          NULL,
	SubmoduleId INT          NULL,
	IsActive    BIT          NOT NULL,
	ActiveKey   VARCHAR(100) NULL,
	[Sequence]  INT          NOT NULL DEFAULT(0),
	CONSTRAINT PK_TblProjectsPages_Id          PRIMARY KEY(Id),
	CONSTRAINT FK_TblProjectsPages_ModuleId    FOREIGN KEY(ModuleId)    REFERENCES dbo.TblProjectsModules(Id),
	CONSTRAINT FK_TblProjectsPages_SubmoduleId FOREIGN KEY(SubmoduleId) REFERENCES dbo.TblProjectsSubmodules(Id),
	CONSTRAINT FK_TblProjectsPages_ProjectId   FOREIGN KEY(ProjectId)   REFERENCES dbo.TblProjects(Id),
	CONSTRAINT UN_TblProjectsPages_ProjectId_ModuleId_SubmoduleId_Name UNIQUE(ProjectId, ModuleId, SubmoduleId, [Name]),
	CONSTRAINT UN_TblProjectsPages_ProjectId_Path UNIQUE(ProjectId, [Path])
);