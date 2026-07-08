CREATE TABLE dbo.TblProjects(
	Id     INT         NOT NULL,
	[Name] VARCHAR(50) NOT NULL,
	CONSTRAINT PK_TblProjects_Id PRIMARY KEY(Id),
	CONSTRAINT UN_TblProjects_Name UNIQUE([Name])
);