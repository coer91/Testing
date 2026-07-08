CREATE TABLE dbo.TblProjectsSubmodules(
	Id            INT         NOT NULL IDENTITY,
	TranslatoryId INT         NOT NULL,
	Icon          VARCHAR(80) NULL,
	ModuleId      INT         NOT NULL,
	MenuTypeId    INT         NOT NULL DEFAULT(1),
	ShowIndicator BIT         NOT NULL DEFAULT(1),
	ShowIndex     BIT         NOT NULL DEFAULT(0),
	[Sequence]    INT         NOT NULL DEFAULT(0),
	CONSTRAINT PK_TblProjectsSubmodules_Id PRIMARY KEY(Id),
	CONSTRAINT FK_TblProjectsSubmodules_TranslatoryId FOREIGN KEY(TranslatoryId) REFERENCES dbo.TblTranslatory(Id),
	CONSTRAINT FK_TblProjectsSubmodules_ModuleId FOREIGN KEY(ModuleId) REFERENCES dbo.TblProjectsModules(Id),
	CONSTRAINT FK_TblProjectsSubmodules_MenuTypeId FOREIGN KEY(MenuTypeId) REFERENCES dbo.TblProjectsMenuType(Id),
	CONSTRAINT UN_TblProjectsSubmodules_TranslatoryId UNIQUE(TranslatoryId)
);