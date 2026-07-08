CREATE TABLE dbo.TblUsers(
	Id         INT         NOT NULL IDENTITY,
	[User]     VARCHAR(20) NOT NULL, 
	PartnerId  INT         NULL,
	Email      VARCHAR(60) NULL,
	LanguageId VARCHAR(10) NOT NULL DEFAULT('en_US'),
	CONSTRAINT PK_TblUsers_Id PRIMARY KEY(Id), 
	CONSTRAINT FK_TblUsers_PartnerId FOREIGN KEY(PartnerId) REFERENCES dbo.TblPartners(Id),
	CONSTRAINT FK_TblUsers_LanguageId FOREIGN KEY(LanguageId) REFERENCES dbo.TblLanguages(Id),
	CONSTRAINT UK_TblUsers_User UNIQUE([User]) 
);