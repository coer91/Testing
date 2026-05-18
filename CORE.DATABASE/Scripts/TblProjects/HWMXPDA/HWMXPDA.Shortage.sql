--
SET @Page      = 'Shortage List';
SET @Path      = '/shortage/MM_SM0101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_SM0101';
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
SET @Page      = 'Trace LOT Location';
SET @Path      = '/shortage/MM_SM0201';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_SM0201';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 2);

--
SET @Page      = 'Lamp Turn On List';
SET @Path      = '/shortage/MM_SM0301';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_SM0301';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 3);

--
SET @Page      = 'Inventory check in cell';
SET @Path      = '/shortage/MM_SM0401';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_SM0401';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 4);