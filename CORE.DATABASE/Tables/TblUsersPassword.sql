CREATE TABLE dbo.TblUsersPassword(
	Id         INT           NOT NULL IDENTITY, 
	UserId     INT           NOT NULL, 
	[Password] NVARCHAR(50)  NOT NULL,
	Salt       VARBINARY(16) NOT NULL,
	Temporary  NVARCHAR(50)  NULL,
	Expiration DATETIME      NULL,
	CONSTRAINT PK_TblUsersPassword_Id PRIMARY KEY(Id),
	CONSTRAINT FK_TblUsersPassword_UserId FOREIGN KEY(UserId) REFERENCES dbo.TblUsers(Id),
	CONSTRAINT UN_TblUsersPassword_UserId UNIQUE(UserId)
);