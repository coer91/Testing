SET @Page      = 'Return to vendor';
SET @Path      = '/change/MM_RT0101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_RT0101';

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

SET @Page      = 'Inspection Return';
SET @Path      = '/change/MM_RT0201';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_RT0201';

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