SET @Page      = '3C Buffer History';
SET @Path      = '/product/MM_PM0101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0101';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'In-Casting Remark';
SET @Path      = '/product/MM_PM0201';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0201';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Out-Casting Remark';
SET @Path      = '/product/MM_PM0202';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0202';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Irregular Remark';
SET @Path      = '/product/MM_PM0203';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0203';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Diecast Product History';
SET @Path      = '/product/MM_PM0204';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0204';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Diecast Palletize History';
SET @Path      = '/product/MM_PM0205';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0205';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------
