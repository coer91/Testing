CREATE TABLE dbo.TblRoles(
	Id       INT           NOT NULL IDENTITY,
	[Name]   VARCHAR(80)   NOT NULL,
	IsActive BIT           NOT NULL,
	About    VARCHAR(2000) NULL
	CONSTRAINT PK_TblRoles_Id PRIMARY KEY(Id),
	CONSTRAINT UN_TblRoles_Name UNIQUE([Name])
);