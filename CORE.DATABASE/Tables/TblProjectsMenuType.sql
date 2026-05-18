CREATE TABLE dbo.TblProjectsMenuType(
	Id     INT        NOT NULL,
	[Name] VARCHAR(5) NOT NULL,
	CONSTRAINT PK_TblProjectsMenuType_Id PRIMARY KEY(Id),
	CONSTRAINT UN_TblProjectsMenuType_Name UNIQUE([Name]),
	CONSTRAINT CH_TblProjectsMenuType_Name CHECK([Name] IN('LIST', 'GRID'))
);