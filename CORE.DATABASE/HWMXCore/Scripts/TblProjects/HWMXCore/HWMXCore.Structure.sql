SET @Page      = 'Projects';
SET @Path      = '/structure/projects';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'Proyectos', N'프로젝트');
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

SET @Page      = 'Modules';
SET @Path      = '/structure/modules';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'Módulos', N'모듈');
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

SET @Page      = 'Submodules';
SET @Path      = '/structure/submodules';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'Submódulos', N'서브모듈');
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

SET @Page      = 'Pages';
SET @Path      = '/structure/pages';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'Páginas', N'페이지');
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

SET @Page      = 'Sidenav';
SET @Path      = '/structure/sidenav';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'Menú lateral', N'사이드 메뉴');
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