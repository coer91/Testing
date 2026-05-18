--
SET @Page      = 'Configuration';
SET @Path      = '/configuration/sidenav';
SET @Icon      = NULL;
SET @ActiveKey = CONCAT(@Page, '-', @HWMXCoreId, '-', @Module);
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXCoreId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXCoreId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, @Secuence); 