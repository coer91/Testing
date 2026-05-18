CREATE TABLE dbo.TblLanguages(
	Id     INT         NOT NULL,
	[Name] VARCHAR(10) NOT NULL,
	CONSTRAINT PK_TblLanguages_Id PRIMARY KEY(Id),
	CONSTRAINT UN_TblLanguages_Name UNIQUE([Name])
);