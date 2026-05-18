CREATE TABLE dbo.TblUsers(
	Id         INT         NOT NULL IDENTITY,
	[User]     VARCHAR(20) NOT NULL, 
	PartnerId  INT         NULL,
	Email      VARCHAR(60) NULL,
	CONSTRAINT PK_TblUsers_Id        PRIMARY KEY(Id), 
	CONSTRAINT FK_TblUsers_PartnerId FOREIGN KEY(PartnerId) REFERENCES dbo.TblPartners(Id),
	CONSTRAINT UK_TblUsers_User      UNIQUE([User]) 
);