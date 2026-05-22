--
SET @Page      = 'Projects';
SET @Path      = '/structure/projects';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXCoreId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXCoreId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 0, @Secuence);
	 
--
SET @Page      = 'Modules';
SET @Path      = '/structure/modules';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXCoreId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXCoreId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 0, @Secuence);

--
SET @Page      = 'Submodules';
SET @Path      = '/structure/submodules';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXCoreId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXCoreId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 0, @Secuence);

--
SET @Page      = 'Pages';
SET @Path      = '/structure/pages';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXCoreId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXCoreId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 0, @Secuence);

--
SET @Page      = 'Sidenav';
SET @Path      = '/structure/sidenav';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXCoreId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXCoreId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 0, @Secuence);