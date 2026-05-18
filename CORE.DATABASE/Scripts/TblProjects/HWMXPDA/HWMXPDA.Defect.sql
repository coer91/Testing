--
SET @Page      = 'Oper Defect Reg(Product)';
SET @Path      = '/defect/MM_DM0101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0101';
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
SET @Page      = 'Material Defect';
SET @Path      = '/defect/MM_DM0201';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0201';
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
SET @Page      = 'Rework Judgement';
SET @Path      = '/defect/MM_DM0301';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0301';
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
SET @Page      = 'Rework Approval';
SET @Path      = '/defect/MM_DM0302';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0302';
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
SET @Page      = 'Material Input';
SET @Path      = '/defect/MM_DM0401';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0401';
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
SET @Page      = 'Material Output';
SET @Path      = '/defect/MM_DM0402';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0402';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 6);

--
SET @Page      = 'Scrap Area LOT Split';
SET @Path      = '/defect/MM_DM0501';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0501';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 7);

--
SET @Page      = 'Reimpregnation';
SET @Path      = '/defect/MM_DM0601';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0601';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 8);

--
SET @Page      = 'QC Ingot Judgement';
SET @Path      = '/defect/MM_DM0701';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM0701';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 9);

--
SET @Page      = 'DC Regist Scrap';
SET @Path      = '/defect/MM_DM9901';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_DM9901';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 10);