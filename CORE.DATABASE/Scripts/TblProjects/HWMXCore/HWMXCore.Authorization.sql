--
SET @Page      = 'Users';
SET @Path      = '/authorization/users';
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
SET @Page      = 'Roles';
SET @Path      = '/authorization/roles';
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