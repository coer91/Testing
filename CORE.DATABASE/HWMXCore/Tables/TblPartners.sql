CREATE TABLE dbo.TblPartners (
	Id       INT          NOT NULL IDENTITY,
	[Name]   VARCHAR(100) NOT NULL,
	IsActive BIT          NOT NULL
	CONSTRAINT PK_TblPartners_Id   PRIMARY KEY(Id),
	CONSTRAINT UN_TblPartners_Name UNIQUE([Name])
);