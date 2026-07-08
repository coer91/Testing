SET @Page      = 'Users';
SET @Path      = '/authorization/users';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'Usuarios', N'사용자');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXCoreId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXCoreId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 0, @Secuence);
	 
--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Roles';
SET @Path      = '/authorization/roles';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'Roles', N'역할');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXCoreId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXCoreId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 0, @Secuence);

--------------------------------------------------------------------------------------------------------------------------