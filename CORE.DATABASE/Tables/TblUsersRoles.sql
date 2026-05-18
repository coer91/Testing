CREATE TABLE dbo.TblUsersRoles(
	Id     INT NOT NULL IDENTITY,
	UserId INT NOT NULL,
	RoleId INT NOT NULL,
	IsMain BIT NOT NULL,
	CONSTRAINT PK_TblUsersRoles_Id PRIMARY KEY(Id),
	CONSTRAINT FK_TblUsersRoles_UserId FOREIGN KEY(UserId) REFERENCES dbo.TblUsers(Id),
	CONSTRAINT FK_TblUsersRoles_RoleId FOREIGN KEY(RoleId) REFERENCES dbo.TblRoles(Id),
	CONSTRAINT UN_TblUsersRoles_UserId_RoleId UNIQUE(UserId, RoleId),
	CONSTRAINT UN_TblUsersRoles_UserId_RoleId_IsMain UNIQUE(UserId, RoleId, IsMain)
);