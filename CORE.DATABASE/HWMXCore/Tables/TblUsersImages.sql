CREATE TABLE dbo.TblUsersImages(
	Id          INT            NOT NULL IDENTITY,
	UserId      INT            NOT NULL, 
	[Name]      VARCHAR(80)    NOT NULL,
	Extension   VARCHAR(5)     NOT NULL,
	IsMain      BIT            NOT NULL,
	[Image]     VARBINARY(MAX) NULL,
	CONSTRAINT PK_TblImages_Id PRIMARY KEY(Id), 
	CONSTRAINT FK_TblImages_UserId FOREIGN KEY(UserId) REFERENCES dbo.TblUsers(Id),
	CONSTRAINT UN_TblImages_UserId_Name UNIQUE(UserId, [Name]),
	CONSTRAINT UN_TblImages_UserId_IsMain UNIQUE(UserId, IsMain)
);