--
SET @Page      = 'Vendor Return';
SET @Path      = '/change/MM_RT0101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_RT0101';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1);


--
SET @Page      = 'Inspection Return';
SET @Path      = '/change/MM_RT0201';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_RT0201';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 2);