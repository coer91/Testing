--
SET @Page      = '3C Buffer History';
SET @Path      = '/product/MM_PM0101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0101';
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
SET @Page      = 'In-Casting Remark';
SET @Path      = '/product/MM_PM0201';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0201';
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
SET @Page      = 'Out-Casting Remark';
SET @Path      = '/product/MM_PM0202';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0202';
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
SET @Page      = 'Irregular Remark';
SET @Path      = '/product/MM_PM0203';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0203';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 4);

--
SET @Page      = 'Diecast Product History';
SET @Path      = '/product/MM_PM0204';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0204';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 5);

--
SET @Page      = 'Diecast Palletize History';
SET @Path      = '/product/MM_PM0205';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_PM0205';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 6); 