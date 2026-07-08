CREATE TABLE dbo.TblTranslatory (
	Id      INT           NOT NULL IDENTITY,
	English NVARCHAR(100) NOT NULL,
	Spanish NVARCHAR(100) NULL,
	Korean  NVARCHAR(100) NULL,
	CONSTRAINT PK_TblTranslatory_Id PRIMARY KEY(Id),
	CONSTRAINT UN_TblTranslatory_English UNIQUE(English)
);